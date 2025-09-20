-- Add seed data for demo workspace with proper column alignment
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

-- Add sample activities
WITH ws AS (SELECT id FROM public.workspaces WHERE name='Marketplace Coaching'),
     sample_leads AS (SELECT id FROM public.leads WHERE workspace_id=(SELECT id FROM ws) LIMIT 5)
INSERT INTO public.activities(workspace_id, lead_id, type, notes, created_by)
SELECT 
  (SELECT id FROM ws),
  sl.id,
  'Nota'::public.activity_type_enum,
  'Actividad de ejemplo',
  '00000000-0000-0000-0000-000000000000'::uuid
FROM sample_leads sl
ON CONFLICT DO NOTHING;