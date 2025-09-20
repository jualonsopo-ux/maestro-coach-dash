-- Fix the INSERT statements with proper enum casting
-- Activities base
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