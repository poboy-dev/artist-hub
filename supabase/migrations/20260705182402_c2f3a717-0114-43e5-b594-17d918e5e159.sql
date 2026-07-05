REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;

CREATE TABLE public.albums (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    year integer NOT NULL,
    type text NOT NULL DEFAULT 'LP',
    cover_url text,
    tracks integer NOT NULL DEFAULT 0,
    buy_url text,
    stream_url text,
    tagline text,
    sort_order integer NOT NULL DEFAULT 0,
    active boolean NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.albums TO anon;
GRANT SELECT ON public.albums TO authenticated;
GRANT ALL ON public.albums TO service_role;

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active albums" ON public.albums FOR SELECT TO anon USING (active = true);
CREATE POLICY "Admins can manage albums" ON public.albums FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.videos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    youtube_id text NOT NULL,
    thumb_url text,
    era text,
    director text,
    sort_order integer NOT NULL DEFAULT 0,
    active boolean NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.videos TO anon;
GRANT SELECT ON public.videos TO authenticated;
GRANT ALL ON public.videos TO service_role;

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active videos" ON public.videos FOR SELECT TO anon USING (active = true);
CREATE POLICY "Admins can manage videos" ON public.videos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.news (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    date date NOT NULL DEFAULT CURRENT_DATE,
    excerpt text NOT NULL,
    content text,
    tag text NOT NULL DEFAULT 'News',
    published boolean NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.news TO anon;
GRANT SELECT ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published news" ON public.news FOR SELECT TO anon USING (published = true);
CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.tour_dates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    date date NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    venue text NOT NULL,
    status text NOT NULL DEFAULT 'onsale',
    ticket_url text,
    vip boolean NOT NULL DEFAULT false,
    active boolean NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tour_dates TO anon;
GRANT SELECT ON public.tour_dates TO authenticated;
GRANT ALL ON public.tour_dates TO service_role;

ALTER TABLE public.tour_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active tour dates" ON public.tour_dates FOR SELECT TO anon USING (active = true);
CREATE POLICY "Admins can manage tour dates" ON public.tour_dates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.merch (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    price text NOT NULL,
    cover_url text,
    tag text NOT NULL DEFAULT 'Apparel',
    active boolean NOT NULL DEFAULT true,
    sort_order integer NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.merch TO anon;
GRANT SELECT ON public.merch TO authenticated;
GRANT ALL ON public.merch TO service_role;

ALTER TABLE public.merch ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active merch" ON public.merch FOR SELECT TO anon USING (active = true);
CREATE POLICY "Admins can manage merch" ON public.merch FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.compositions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    key text NOT NULL,
    pages integer NOT NULL DEFAULT 1,
    difficulty text NOT NULL DEFAULT 'Intermediate',
    active boolean NOT NULL DEFAULT true,
    sort_order integer NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.compositions TO anon;
GRANT SELECT ON public.compositions TO authenticated;
GRANT ALL ON public.compositions TO service_role;

ALTER TABLE public.compositions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active compositions" ON public.compositions FOR SELECT TO anon USING (active = true);
CREATE POLICY "Admins can manage compositions" ON public.compositions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.fan_club_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    name text,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.fan_club_members TO authenticated;
GRANT INSERT ON public.fan_club_members TO anon;
GRANT INSERT ON public.fan_club_members TO authenticated;
GRANT ALL ON public.fan_club_members TO service_role;

ALTER TABLE public.fan_club_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join fan club" ON public.fan_club_members FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can join fan club auth" ON public.fan_club_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can read members" ON public.fan_club_members FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_email text NOT NULL,
    items jsonb NOT NULL DEFAULT '[]'::jsonb,
    total text NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;
GRANT SELECT ON public.orders TO authenticated;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage orders" ON public.orders FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_albums_updated_at BEFORE UPDATE ON public.albums FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tour_dates_updated_at BEFORE UPDATE ON public.tour_dates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_merch_updated_at BEFORE UPDATE ON public.merch FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_compositions_updated_at BEFORE UPDATE ON public.compositions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();