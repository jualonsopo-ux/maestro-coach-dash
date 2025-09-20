-- Seed data for CRM (Note: This will only work with actual user IDs)
-- Replace 'your-user-id-here' with actual authenticated user IDs

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

-- Insert sample activities
INSERT INTO activities (lead_id, type, done, user_id) VALUES
-- Actividades para María García López (lead_id: 1)
(1, 'S1', false, auth.uid()),
(1, 'Nota', true, auth.uid()),

-- Actividades para Carlos Rodríguez (lead_id: 2)
(2, 'S1', true, auth.uid()),
(2, 'Nota', true, auth.uid()),
(2, 'S2', false, auth.uid()),

-- Actividades para Ana Martínez Silva (lead_id: 3)
(3, 'S1', true, auth.uid()),
(3, 'S2', false, auth.uid()),
(3, 'Nota', true, auth.uid()),

-- Actividades para Luis Fernando Castro (lead_id: 4)
(4, 'S1', true, auth.uid()),
(4, 'S2', true, auth.uid()),
(4, 'Pago', true, auth.uid()),
(4, 'Nota', true, auth.uid()),

-- Actividades para Isabella Herrera (lead_id: 5)
(5, 'S1', true, auth.uid()),
(5, 'Nota', true, auth.uid()),
(5, 'S2', false, auth.uid()),

-- Actividades para Diego Morales (lead_id: 6)
(6, 'S1', true, auth.uid()),
(6, 'Nota', true, auth.uid()),

-- Actividades para Carmen Jiménez (lead_id: 7)
(7, 'S1', false, auth.uid()),
(7, 'Nota', true, auth.uid()),

-- Actividades para Roberto Vega (lead_id: 8)
(8, 'S1', true, auth.uid()),
(8, 'S2', false, auth.uid()),
(8, 'Nota', true, auth.uid()),

-- Actividades para Sofía Ramírez (lead_id: 9)
(9, 'S1', false, auth.uid()),
(9, 'Nota', true, auth.uid()),

-- Actividades para Andrés Delgado (lead_id: 10)
(10, 'S1', true, auth.uid()),
(10, 'S2', false, auth.uid()),
(10, 'Nota', true, auth.uid()),

-- Actividades para Valentina Torres (lead_id: 11)
(11, 'S1', true, auth.uid()),
(11, 'Nota', true, auth.uid()),
(11, 'S2', false, auth.uid()),

-- Actividades para Fernando López (lead_id: 12)
(12, 'S1', true, auth.uid()),
(12, 'Nota', true, auth.uid()),
(12, 'S2', false, auth.uid()),

-- Actividades para Camila Ruiz (lead_id: 13)
(13, 'S1', true, auth.uid()),
(13, 'S2', true, auth.uid()),
(13, 'Pago', true, auth.uid()),
(13, 'Nota', true, auth.uid()),

-- Actividades para Gabriel Sánchez (lead_id: 14)
(14, 'S1', false, auth.uid()),
(14, 'Nota', true, auth.uid()),

-- Actividades para Natalia Vargas (lead_id: 15)
(15, 'S1', true, auth.uid()),
(15, 'Nota', true, auth.uid()),
(15, 'S2', false, auth.uid()),

-- Actividades para Sebastián Cruz (lead_id: 16)
(16, 'S1', true, auth.uid()),
(16, 'S2', false, auth.uid()),
(16, 'Nota', true, auth.uid()),

-- Actividades para Daniela Mendoza (lead_id: 17)
(17, 'S1', true, auth.uid()),
(17, 'S2', false, auth.uid()),
(17, 'Nota', true, auth.uid()),

-- Actividades para Alejandro Romero (lead_id: 18)
(18, 'S1', true, auth.uid()),
(18, 'Nota', true, auth.uid()),

-- Actividades para Paola Guerrero (lead_id: 19)
(19, 'S1', false, auth.uid()),
(19, 'Nota', true, auth.uid()),

-- Actividades para Mateo Herrera (lead_id: 20)
(20, 'S1', true, auth.uid()),
(20, 'Nota', true, auth.uid()),
(20, 'S2', false, auth.uid());