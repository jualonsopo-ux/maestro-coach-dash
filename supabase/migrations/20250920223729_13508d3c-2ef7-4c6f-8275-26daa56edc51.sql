-- Simple seed data with proper workspace creation
INSERT INTO public.workspaces(name)
VALUES ('Demo Workspace')
ON CONFLICT DO NOTHING;

-- Get the workspace ID and insert sample data
DO $$
DECLARE
    workspace_uuid bigint;
    demo_user_id uuid := '00000000-0000-0000-0000-000000000000';
BEGIN
    -- Get workspace ID
    SELECT id INTO workspace_uuid FROM public.workspaces WHERE name = 'Demo Workspace' LIMIT 1;
    
    -- Insert member
    INSERT INTO public.members(workspace_id, user_id, role)
    VALUES (workspace_uuid, demo_user_id, 'owner')
    ON CONFLICT DO NOTHING;
    
    -- Insert tags
    INSERT INTO public.tags(workspace_id, name) VALUES
    (workspace_uuid, 'alta_prioridad'),
    (workspace_uuid, 'caliente'),
    (workspace_uuid, 'instagram'),
    (workspace_uuid, 'google_ads'),
    (workspace_uuid, 'paquete_premium'),
    (workspace_uuid, 'precio')
    ON CONFLICT DO NOTHING;
    
    -- Insert sample leads
    INSERT INTO public.leads(workspace_id, owner_id, full_name, email, channel, stage, score, amount, priority, next_step, due_at) VALUES
    (workspace_uuid, demo_user_id, 'Ana García', 'ana@example.com', 'instagram', 'S1 reservado', 85, 1200.00, 'alta', 'Confirmar asistencia S1', now() + interval '1 day'),
    (workspace_uuid, demo_user_id, 'Carlos Ruiz', 'carlos@example.com', 'google_ads', 'S1 hecho', 92, 2400.00, 'alta', 'Enviar enlace S2', now()),
    (workspace_uuid, demo_user_id, 'Laura Martín', 'laura@example.com', 'referido', 'Propuesta', 78, 3600.00, 'media', 'Seguimiento propuesta', now() - interval '1 day')
    ON CONFLICT DO NOTHING;
    
END $$;