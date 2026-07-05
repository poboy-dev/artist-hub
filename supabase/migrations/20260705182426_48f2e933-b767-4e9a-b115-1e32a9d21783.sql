DROP POLICY IF EXISTS "Anyone can join fan club" ON public.fan_club_members;
DROP POLICY IF EXISTS "Anyone can join fan club auth" ON public.fan_club_members;

GRANT INSERT ON public.fan_club_members TO service_role;