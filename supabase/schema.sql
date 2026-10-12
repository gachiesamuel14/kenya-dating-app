-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  age INT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  bio TEXT,
  avatar_url TEXT,
  interests TEXT[],
  county TEXT,
  tribe TEXT,
  religion TEXT,
  location geography(POINT),
  last_active TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Spatial index
CREATE INDEX IF NOT EXISTS profiles_location_idx ON public.profiles USING GIST (location);

-- Nearby users function (example)
CREATE OR REPLACE FUNCTION public.nearby_users(
  lat FLOAT,
  lng FLOAT,
  radius_meters INT DEFAULT 50000
)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  age INT,
  bio TEXT,
  avatar_url TEXT,
  distance_meters FLOAT
)
LANGUAGE sql
AS $$
  SELECT
    id,
    full_name,
    age,
    bio,
    avatar_url,
    extensions.ST_Distance(
      location,
      extensions.ST_SetSRID(extensions.ST_MakePoint(lng, lat), 4326)::geography
    ) AS distance_meters
  FROM public.profiles
  WHERE extensions.ST_DWithin(
    location,
    extensions.ST_SetSRID(extensions.ST_MakePoint(lng, lat), 4326)::geography,
    radius_meters
  )
  ORDER BY distance_meters;
$$;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Basic policies (customize as needed)
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to create profile on signup (optional)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
