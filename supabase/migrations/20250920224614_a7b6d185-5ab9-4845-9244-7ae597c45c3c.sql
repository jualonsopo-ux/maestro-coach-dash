-- Calendar database schema

-- Session type enum
CREATE TYPE session_type_enum AS ENUM ('S1', 'S2', 'S3');

-- Session status enum  
CREATE TYPE session_status_enum AS ENUM ('programada', 'confirmada', 'en_curso', 'completada', 'cancelada', 'no_show');

-- Payment status enum
CREATE TYPE payment_status_enum AS ENUM ('pendiente', 'pagada', 'reembolsada');

-- Day of week enum for availability
CREATE TYPE day_of_week_enum AS ENUM ('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo');

-- Sessions table - main calendar events
CREATE TABLE public.sessions (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    workspace_id bigint NOT NULL,
    lead_id bigint REFERENCES public.leads(id) ON DELETE CASCADE,
    created_by uuid NOT NULL,
    session_type session_type_enum NOT NULL,
    title text NOT NULL,
    notes text,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    status session_status_enum NOT NULL DEFAULT 'programada',
    payment_status payment_status_enum NOT NULL DEFAULT 'pendiente',
    amount numeric(10,2),
    location text,
    meeting_url text,
    reminder_sent boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Availability rules table - weekly recurring availability
CREATE TABLE public.availability_rules (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    workspace_id bigint NOT NULL,
    user_id uuid NOT NULL,
    day_of_week day_of_week_enum NOT NULL,
    start_time time NOT NULL,
    end_time time NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Availability exceptions table - specific date overrides
CREATE TABLE public.availability_exceptions (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    workspace_id bigint NOT NULL,
    user_id uuid NOT NULL,
    date date NOT NULL,
    start_time time,
    end_time time,
    is_available boolean NOT NULL DEFAULT false, -- false = blocked day, true = special availability
    reason text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Session templates table - predefined session types with durations and prices
CREATE TABLE public.session_templates (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    workspace_id bigint NOT NULL,
    session_type session_type_enum NOT NULL,
    name text NOT NULL,
    description text,
    duration_minutes integer NOT NULL,
    default_price numeric(10,2),
    color text DEFAULT '#3B82F6',
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(workspace_id, session_type)
);

-- Enable RLS on all tables
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_templates ENABLE ROW LEVEL SECURITY;

-- RLS policies for sessions
CREATE POLICY "sessions_select" ON public.sessions FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = sessions.workspace_id AND m.user_id = auth.uid()
));

CREATE POLICY "sessions_insert" ON public.sessions FOR INSERT 
WITH CHECK (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = sessions.workspace_id AND m.user_id = auth.uid()
));

CREATE POLICY "sessions_update" ON public.sessions FOR UPDATE 
USING (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = sessions.workspace_id AND m.user_id = auth.uid()
));

CREATE POLICY "sessions_delete" ON public.sessions FOR DELETE 
USING (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = sessions.workspace_id AND m.user_id = auth.uid()
));

-- RLS policies for availability_rules
CREATE POLICY "availability_rules_all" ON public.availability_rules FOR ALL 
USING (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = availability_rules.workspace_id AND m.user_id = auth.uid()
))
WITH CHECK (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = availability_rules.workspace_id AND m.user_id = auth.uid()
));

-- RLS policies for availability_exceptions
CREATE POLICY "availability_exceptions_all" ON public.availability_exceptions FOR ALL 
USING (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = availability_exceptions.workspace_id AND m.user_id = auth.uid()
))
WITH CHECK (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = availability_exceptions.workspace_id AND m.user_id = auth.uid()
));

-- RLS policies for session_templates
CREATE POLICY "session_templates_all" ON public.session_templates FOR ALL 
USING (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = session_templates.workspace_id AND m.user_id = auth.uid()
))
WITH CHECK (EXISTS (
    SELECT 1 FROM members m 
    WHERE m.workspace_id = session_templates.workspace_id AND m.user_id = auth.uid()
));

-- Triggers for updated_at
CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON public.sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_availability_rules_updated_at
    BEFORE UPDATE ON public.availability_rules
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_availability_exceptions_updated_at
    BEFORE UPDATE ON public.availability_exceptions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_session_templates_updated_at
    BEFORE UPDATE ON public.session_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_sessions_workspace_id ON public.sessions(workspace_id);
CREATE INDEX idx_sessions_lead_id ON public.sessions(lead_id);
CREATE INDEX idx_sessions_start_time ON public.sessions(start_time);
CREATE INDEX idx_sessions_status ON public.sessions(status);
CREATE INDEX idx_sessions_created_by ON public.sessions(created_by);

CREATE INDEX idx_availability_rules_workspace_user ON public.availability_rules(workspace_id, user_id);
CREATE INDEX idx_availability_rules_day ON public.availability_rules(day_of_week);

CREATE INDEX idx_availability_exceptions_workspace_user ON public.availability_exceptions(workspace_id, user_id);
CREATE INDEX idx_availability_exceptions_date ON public.availability_exceptions(date);

CREATE INDEX idx_session_templates_workspace ON public.session_templates(workspace_id);
CREATE INDEX idx_session_templates_type ON public.session_templates(session_type);

-- Insert default session templates
INSERT INTO public.session_templates (workspace_id, session_type, name, description, duration_minutes, default_price, color)
SELECT 
    w.id,
    'S1',
    'Sesión S1 - Inicial',
    'Sesión inicial de descubrimiento y diagnóstico',
    10,
    0.00,
    '#22C55E'
FROM public.workspaces w
ON CONFLICT DO NOTHING;

INSERT INTO public.session_templates (workspace_id, session_type, name, description, duration_minutes, default_price, color)
SELECT 
    w.id,
    'S2',
    'Sesión S2 - Estrategia',
    'Sesión de presentación de estrategia',
    25,
    1200.00,
    '#F59E0B'
FROM public.workspaces w
ON CONFLICT DO NOTHING;

INSERT INTO public.session_templates (workspace_id, session_type, name, description, duration_minutes, default_price, color)
SELECT 
    w.id,
    'S3',
    'Sesión S3 - Implementación',
    'Sesión de implementación y seguimiento',
    45,
    2400.00,
    '#EF4444'
FROM public.workspaces w
ON CONFLICT DO NOTHING;

-- Sample availability rules (Monday to Friday, 9-13 and 15-19)
INSERT INTO public.availability_rules (workspace_id, user_id, day_of_week, start_time, end_time)
SELECT 
    w.id,
    m.user_id,
    unnest(ARRAY['lunes', 'martes', 'miercoles', 'jueves', 'viernes']::day_of_week_enum[]),
    '09:00'::time,
    '13:00'::time
FROM public.workspaces w
JOIN public.members m ON m.workspace_id = w.id
WHERE m.role = 'owner'
ON CONFLICT DO NOTHING;

INSERT INTO public.availability_rules (workspace_id, user_id, day_of_week, start_time, end_time)
SELECT 
    w.id,
    m.user_id,
    unnest(ARRAY['lunes', 'martes', 'miercoles', 'jueves', 'viernes']::day_of_week_enum[]),
    '15:00'::time,
    '19:00'::time
FROM public.workspaces w
JOIN public.members m ON m.workspace_id = w.id
WHERE m.role = 'owner'
ON CONFLICT DO NOTHING;