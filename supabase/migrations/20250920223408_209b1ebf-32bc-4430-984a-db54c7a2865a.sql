-- Fix the enum casting issue and apply comprehensive CRM schema

-- ========== 6) SEED (demo) ==========
-- demo owner (reemplaza por tu UUID si quieres)
INSERT INTO public.workspaces(name)
VALUES ('Marketplace Coaching')
ON CONFLICT DO NOTHING;

WITH ws AS (
  SELECT id FROM public.workspaces WHERE name = 'Marketplace Coaching' LIMIT 1
)
INSERT INTO public.members(workspace_id, user_id, role)
SELECT ws.id, '00000000-0000-0000-0000-000000000000'::uuid, 'owner' FROM ws
ON CONFLICT DO NOTHING;

-- Tags
WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching')
INSERT INTO public.tags(workspace_id, name)
SELECT ws.id, t FROM ws, (VALUES
 ('alta_prioridad'),('caliente'),('instagram'),('google_ads'),
 ('paquete_premium'),('precio')
) AS v(t)
ON CONFLICT DO NOTHING;

-- Leads base (Ana, Carlos, Laura)
WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching')
INSERT INTO public.leads(workspace_id, owner_id, full_name, email, channel, stage, score, amount, priority, next_step, due_at, last_contact_at)
SELECT ws.id, '00000000-0000-0000-0000-000000000000'::uuid, 'Ana García',   'ana@example.com',   'instagram'::public.lead_channel_enum,
       'S1 reservado'::public.lead_stage_enum, 85, 1200, 'alta'::public.priority_enum,
       'Confirmar asistencia S1', (now()::date + 1)::timestamptz, (now()::date - 248)::timestamptz
FROM ws
UNION ALL
SELECT ws.id, '00000000-0000-0000-0000-000000000000'::uuid, 'Carlos Ruiz',  'carlos@example.com', 'google_ads'::public.lead_channel_enum,
       'S1 hecho'::public.lead_stage_enum, 92, 2400, 'alta'::public.priority_enum,
       'Enviar enlace S2', now()::date::timestamptz, (now()::date - 249)::timestamptz
FROM ws
UNION ALL
SELECT ws.id, '00000000-0000-0000-0000-000000000000'::uuid, 'Laura Martín', 'laura@example.com',  'referido'::public.lead_channel_enum,
       'Propuesta'::public.lead_stage_enum, 78, 3600, 'media'::public.priority_enum,
       'Seguimiento propuesta', (now()::date - 1)::timestamptz, (now()::date - 250)::timestamptz
FROM ws
ON CONFLICT DO NOTHING;

-- Tagging para los leads base
WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching'),
     l  AS (SELECT id, full_name FROM public.leads WHERE workspace_id=(SELECT id FROM ws))
INSERT INTO public.lead_tags(lead_id, tag_id)
SELECT (SELECT id FROM l WHERE full_name='Ana García'),
       (SELECT id FROM public.tags WHERE workspace_id=(SELECT id FROM ws) AND name='alta_prioridad')
ON CONFLICT DO NOTHING;

WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching'),
     l  AS (SELECT id, full_name FROM public.leads WHERE workspace_id=(SELECT id FROM ws))
INSERT INTO public.lead_tags(lead_id, tag_id)
SELECT (SELECT id FROM l WHERE full_name='Ana García'),
       (SELECT id FROM public.tags WHERE workspace_id=(SELECT id FROM ws) AND name='instagram')
ON CONFLICT DO NOTHING;

WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching'),
     l  AS (SELECT id, full_name FROM public.leads WHERE workspace_id=(SELECT id FROM ws))
INSERT INTO public.lead_tags(lead_id, tag_id)
SELECT (SELECT id FROM l WHERE full_name='Carlos Ruiz'),
       (SELECT id FROM public.tags WHERE workspace_id=(SELECT id FROM ws) AND name='google_ads')
ON CONFLICT DO NOTHING;

WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching'),
     l  AS (SELECT id, full_name FROM public.leads WHERE workspace_id=(SELECT id FROM ws))
INSERT INTO public.lead_tags(lead_id, tag_id)
SELECT (SELECT id FROM l WHERE full_name='Carlos Ruiz'),
       (SELECT id FROM public.tags WHERE workspace_id=(SELECT id FROM ws) AND name='caliente')
ON CONFLICT DO NOTHING;

WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching'),
     l  AS (SELECT id, full_name FROM public.leads WHERE workspace_id=(SELECT id FROM ws))
INSERT INTO public.lead_tags(lead_id, tag_id)
SELECT (SELECT id FROM l WHERE full_name='Laura Martín'),
       (SELECT id FROM public.tags WHERE workspace_id=(SELECT id FROM ws) AND name='paquete_premium')
ON CONFLICT DO NOTHING;

-- Activities base (with proper enum casting)
WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching'),
     l_ana AS (SELECT id FROM public.leads WHERE full_name='Ana García'   AND workspace_id=(SELECT id FROM ws)),
     l_carl AS (SELECT id FROM public.leads WHERE full_name='Carlos Ruiz' AND workspace_id=(SELECT id FROM ws)),
     l_laur AS (SELECT id FROM public.leads WHERE full_name='Laura Martín'AND workspace_id=(SELECT id FROM ws))
INSERT INTO public.activities(workspace_id, lead_id, type, scheduled_at, done_at, amount, notes, created_by)
SELECT (SELECT id FROM ws), (SELECT id FROM l_ana),  'S1'::public.activity_type_enum, now()+interval '1 day', NULL, NULL, 'Recordatorio asistencia S1', '00000000-0000-0000-0000-000000000000'::uuid
UNION ALL
SELECT (SELECT id FROM ws), (SELECT id FROM l_carl), 'S1'::public.activity_type_enum, now()-interval '1 day', now()-interval '1 day', NULL, 'S1 realizado', '00000000-0000-0000-0000-000000000000'::uuid
UNION ALL
SELECT (SELECT id FROM ws), (SELECT id FROM l_carl), 'S2'::public.activity_type_enum, now(), NULL, NULL, 'Enviar enlace S2', '00000000-0000-0000-0000-000000000000'::uuid
UNION ALL
SELECT (SELECT id FROM ws), (SELECT id FROM l_laur), 'Nota'::public.activity_type_enum, NULL, now()-interval '2 day', NULL, 'Enviada propuesta', '00000000-0000-0000-0000-000000000000'::uuid
ON CONFLICT DO NOTHING;

-- Seed extra (30 leads aleatorios)
WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching')
INSERT INTO public.leads(workspace_id, owner_id, full_name, email, channel, stage, score, amount, priority, next_step, due_at, last_contact_at)
SELECT
  (SELECT id FROM ws),
  '00000000-0000-0000-0000-000000000000'::uuid,
  'Lead ' || gs,
  'lead' || gs || '@example.com',
  (ARRAY['instagram','google_ads','referido','orgánico','otros'])[(1 + (random()*4)::int)]::public.lead_channel_enum,
  (ARRAY['S1 reservado','S1 hecho','S2 reservado','Propuesta','Ganado','Perdido'])[(1 + (random()*5)::int)]::public.lead_stage_enum,
  (random()*60 + 20)::int,
  round((random()*4500 + 500)::numeric,2),
  (ARRAY['baja','media','alta','critica'])[(1 + (random()*3)::int)]::public.priority_enum,
  (ARRAY['Confirmar asistencia S1','Enviar enlace S2','Seguimiento propuesta','Llamar cliente','Enviar email'])[1 + (random()*4)::int],
  (now()::date + ((random()*4 - 2)::int))::timestamptz,
  now() - ((random()*300)::int || ' days')::interval
FROM generate_series(1,30) gs
ON CONFLICT DO NOTHING;

-- Auto-tagging aleatorio para seed extra
WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching'),
     lt AS (
       SELECT l.id AS lead_id,
              (SELECT id FROM public.tags WHERE workspace_id=(SELECT id FROM ws) ORDER BY random() LIMIT 1) AS tag_id
       FROM public.leads l WHERE l.workspace_id=(SELECT id FROM ws) AND l.full_name LIKE 'Lead %'
     )
INSERT INTO public.lead_tags(lead_id, tag_id)
SELECT lead_id, tag_id FROM lt
ON CONFLICT DO NOTHING;