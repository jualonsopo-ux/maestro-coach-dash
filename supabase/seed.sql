-- Seed data for CRM (Note: This will only work with actual user IDs)
-- Replace auth.uid() with actual authenticated user IDs when using

-- Insert sample leads
INSERT INTO leads (full_name, channel, score, amount, status, priority, tags, notes, due_date, user_id) VALUES
('María García López', 'instagram', 92, 2400.00, 'S1 reservado', 'alta_prioridad', '{"instagram", "alta_prioridad", "paquete_premium"}', 'Confirmar asistencia S1', CURRENT_DATE + INTERVAL '1 day', auth.uid()),
('Carlos Rodríguez', 'referido', 85, 1800.00, 'Propuesta', 'caliente', '{"referido", "caliente"}', 'Enviar propuesta detallada', CURRENT_DATE, auth.uid()),
('Ana Martínez Silva', 'google_ads', 78, 3200.00, 'S2 reservado', 'media', '{"google_ads", "paquete_premium"}', 'Preparar material S2', CURRENT_DATE + INTERVAL '2 days', auth.uid()),
('Luis Fernando Castro', 'instagram', 95, 4500.00, 'Ganado', 'alta_prioridad', '{"instagram", "vip", "paquete_completo"}', 'Cliente cerrado - iniciar onboarding', CURRENT_DATE - INTERVAL '1 day', auth.uid()),
('Isabella Herrera', 'referido', 88, 2100.00, 'S1 hecho', 'caliente', '{"referido", "alta_prioridad"}', 'Seguimiento post S1', CURRENT_DATE, auth.uid()),
('Diego Morales', 'google_ads', 72, 1500.00, 'Perdido', 'baja', '{"google_ads", "precio_sensible"}', 'No interesado en el momento', CURRENT_DATE - INTERVAL '3 days', auth.uid()),
('Carmen Jiménez', 'instagram', 89, 2800.00, 'S1 reservado', 'alta_prioridad', '{"instagram", "caliente", "paquete_premium"}', 'Muy motivada - confirmar horario', CURRENT_DATE + INTERVAL '1 day', auth.uid()),
('Roberto Vega', 'referido', 91, 3600.00, 'Propuesta', 'alta_prioridad', '{"referido", "vip"}', 'Negociar condiciones especiales', CURRENT_DATE, auth.uid()),
('Sofía Ramírez', 'google_ads', 76, 1200.00, 'S1 reservado', 'media', '{"google_ads", "primera_vez"}', 'Enviar enlace de reunión', CURRENT_DATE + INTERVAL '1 day', auth.uid()),
('Andrés Delgado', 'instagram', 83, 2600.00, 'S2 reservado', 'caliente', '{"instagram", "paquete_premium"}', 'Preparar caso de estudio', CURRENT_DATE + INTERVAL '3 days', auth.uid()),
('Valentina Torres', 'referido', 87, 2200.00, 'S1 hecho', 'alta_prioridad', '{"referido", "caliente"}', 'Programar S2 urgente', CURRENT_DATE, auth.uid()),
('Fernando López', 'google_ads', 74, 1800.00, 'Propuesta', 'media', '{"google_ads", "comparando_opciones"}', 'Competencia con otros coaches', CURRENT_DATE - INTERVAL '1 day', auth.uid()),
('Camila Ruiz', 'instagram', 94, 4200.00, 'Ganado', 'vip', '{"instagram", "vip", "paquete_completo"}', 'Cliente premium - atención especial', CURRENT_DATE - INTERVAL '2 days', auth.uid()),
('Gabriel Sánchez', 'referido', 79, 1600.00, 'S1 reservado', 'media', '{"referido", "primera_vez"}', 'Explicar proceso completo', CURRENT_DATE + INTERVAL '2 days', auth.uid()),
('Natalia Vargas', 'google_ads', 86, 2500.00, 'S1 hecho', 'caliente', '{"google_ads", "alta_prioridad"}', 'Muy satisfecha con S1', CURRENT_DATE, auth.uid()),
('Sebastián Cruz', 'instagram', 90, 3800.00, 'Propuesta', 'alta_prioridad', '{"instagram", "vip"}', 'Propuesta personalizada enviada', CURRENT_DATE + INTERVAL '1 day', auth.uid()),
('Daniela Mendoza', 'referido', 82, 2000.00, 'S2 reservado', 'caliente', '{"referido", "paquete_premium"}', 'Confirmar asistencia S2', CURRENT_DATE + INTERVAL '4 days', auth.uid()),
('Alejandro Romero', 'google_ads', 77, 1400.00, 'Perdido', 'baja', '{"google_ads", "presupuesto_limitado"}', 'Fuera de presupuesto', CURRENT_DATE - INTERVAL '5 days', auth.uid()),
('Paola Guerrero', 'instagram', 93, 3400.00, 'S1 reservado', 'vip', '{"instagram", "vip", "urgente"}', 'Necesita resultados rápidos', CURRENT_DATE + INTERVAL '1 day', auth.uid()),
('Mateo Herrera', 'referido', 84, 2300.00, 'S1 hecho', 'alta_prioridad', '{"referido", "caliente"}', 'Programar seguimiento', CURRENT_DATE, auth.uid());

-- Insert sample activities (using lead sequence numbers, will need to be updated with actual lead IDs)
INSERT INTO activities (lead_id, type, done, user_id) VALUES
-- Actividades para lead 1 (María García López)
((SELECT id FROM leads WHERE full_name = 'María García López' LIMIT 1), 'S1', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'María García López' LIMIT 1), 'Nota', true, auth.uid()),

-- Actividades para lead 2 (Carlos Rodríguez)
((SELECT id FROM leads WHERE full_name = 'Carlos Rodríguez' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Carlos Rodríguez' LIMIT 1), 'Nota', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Carlos Rodríguez' LIMIT 1), 'S2', false, auth.uid()),

-- Actividades para lead 3 (Ana Martínez Silva)
((SELECT id FROM leads WHERE full_name = 'Ana Martínez Silva' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Ana Martínez Silva' LIMIT 1), 'S2', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Ana Martínez Silva' LIMIT 1), 'Nota', true, auth.uid()),

-- Actividades para lead 4 (Luis Fernando Castro)
((SELECT id FROM leads WHERE full_name = 'Luis Fernando Castro' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Luis Fernando Castro' LIMIT 1), 'S2', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Luis Fernando Castro' LIMIT 1), 'Pago', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Luis Fernando Castro' LIMIT 1), 'Nota', true, auth.uid()),

-- Actividades para lead 5 (Isabella Herrera)
((SELECT id FROM leads WHERE full_name = 'Isabella Herrera' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Isabella Herrera' LIMIT 1), 'Nota', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Isabella Herrera' LIMIT 1), 'S2', false, auth.uid()),

-- Actividades para lead 6 (Diego Morales)
((SELECT id FROM leads WHERE full_name = 'Diego Morales' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Diego Morales' LIMIT 1), 'Nota', true, auth.uid()),

-- Actividades para lead 7 (Carmen Jiménez)
((SELECT id FROM leads WHERE full_name = 'Carmen Jiménez' LIMIT 1), 'S1', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Carmen Jiménez' LIMIT 1), 'Nota', true, auth.uid()),

-- Actividades para lead 8 (Roberto Vega)
((SELECT id FROM leads WHERE full_name = 'Roberto Vega' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Roberto Vega' LIMIT 1), 'S2', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Roberto Vega' LIMIT 1), 'Nota', true, auth.uid()),

-- Actividades para lead 9 (Sofía Ramírez)
((SELECT id FROM leads WHERE full_name = 'Sofía Ramírez' LIMIT 1), 'S1', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Sofía Ramírez' LIMIT 1), 'Nota', true, auth.uid()),

-- Actividades para lead 10 (Andrés Delgado)
((SELECT id FROM leads WHERE full_name = 'Andrés Delgado' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Andrés Delgado' LIMIT 1), 'S2', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Andrés Delgado' LIMIT 1), 'Nota', true, auth.uid()),

-- Actividades adicionales para completar ~50 actividades
((SELECT id FROM leads WHERE full_name = 'Valentina Torres' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Valentina Torres' LIMIT 1), 'Nota', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Valentina Torres' LIMIT 1), 'S2', false, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Fernando López' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Fernando López' LIMIT 1), 'Nota', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Fernando López' LIMIT 1), 'S2', false, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Camila Ruiz' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Camila Ruiz' LIMIT 1), 'S2', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Camila Ruiz' LIMIT 1), 'Pago', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Camila Ruiz' LIMIT 1), 'Nota', true, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Gabriel Sánchez' LIMIT 1), 'S1', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Gabriel Sánchez' LIMIT 1), 'Nota', true, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Natalia Vargas' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Natalia Vargas' LIMIT 1), 'Nota', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Natalia Vargas' LIMIT 1), 'S2', false, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Sebastián Cruz' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Sebastián Cruz' LIMIT 1), 'S2', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Sebastián Cruz' LIMIT 1), 'Nota', true, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Daniela Mendoza' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Daniela Mendoza' LIMIT 1), 'S2', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Daniela Mendoza' LIMIT 1), 'Nota', true, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Alejandro Romero' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Alejandro Romero' LIMIT 1), 'Nota', true, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Paola Guerrero' LIMIT 1), 'S1', false, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Paola Guerrero' LIMIT 1), 'Nota', true, auth.uid()),

((SELECT id FROM leads WHERE full_name = 'Mateo Herrera' LIMIT 1), 'S1', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Mateo Herrera' LIMIT 1), 'Nota', true, auth.uid()),
((SELECT id FROM leads WHERE full_name = 'Mateo Herrera' LIMIT 1), 'S2', false, auth.uid());