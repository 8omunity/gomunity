-- Create user profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  profile_image_url TEXT,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
  age_group VARCHAR(20) CHECK (age_group IN ('20대_미만', '20대', '30대', '40대', '50대_이상')) NOT NULL,
  interests TEXT[] DEFAULT '{}', -- Array of interest categories
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  UNIQUE(user_id),
  UNIQUE(nickname)
);

-- Create user consent table
CREATE TABLE user_consent (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_visibility_consent BOOLEAN DEFAULT FALSE NOT NULL,
  recommendation_consent BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  UNIQUE(user_id)
);

-- Create interest categories table for reference
CREATE TABLE interest_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  UNIQUE(name)
);

-- Insert default interest categories
INSERT INTO interest_categories (name, description) VALUES
  ('반려동물', '반려동물 관련 고민과 제품'),
  ('육아', '육아 및 자녀 양육 관련'),
  ('건강', '건강 관리 및 의료 관련'),
  ('뷰티', '화장품, 스킨케어, 헤어케어'),
  ('패션', '의류, 액세서리, 스타일링'),
  ('홈리빙', '인테리어, 가구, 생활용품'),
  ('운동', '피트니스, 스포츠 용품'),
  ('요리', '요리 도구, 식재료, 레시피'),
  ('취미', '취미 활동 관련 용품'),
  ('테크', '전자제품, 가전, IT 기기'),
  ('여행', '여행 용품, 여행지 추천'),
  ('교육', '학습 도구, 교육 서비스'),
  ('기타', '기타 카테고리');

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_consent ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user_consent
CREATE POLICY "Users can view their own consent" ON user_consent
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consent" ON user_consent
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consent" ON user_consent
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for interest_categories (public read)
CREATE POLICY "Everyone can view interest categories" ON interest_categories
  FOR SELECT TO authenticated, anon
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();