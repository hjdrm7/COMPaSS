-- Create auth users through Supabase Dashboard/Auth (or CLI), then set their profile roles:
-- update public.profiles set role='toc', full_name='TOC Operator' where id = '<toc user uuid>';
insert into public.patrol_points(name,lat,lng,status) values ('Patrol Alpha',8.4864,123.8028,'available'),('Patrol Bravo',8.4829,123.8091,'available'),('Patrol Charlie',8.4901,123.8072,'unavailable');
