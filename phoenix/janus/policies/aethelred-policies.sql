-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE supabase_connection ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_connection ENABLE ROW LEVEL SECURITY;
ALTER TABLE resend_connection ENABLE ROW LEVEL SECURITY;
ALTER TABLE vercel_connection ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_connection ENABLE ROW LEVEL SECURITY;
ALTER TABLE audhdities_platform ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness ENABLE ROW LEVEL SECURITY;
ALTER TABLE council_houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE hearth_keeper ENABLE ROW LEVEL SECURITY;
ALTER TABLE chancellor ENABLE ROW LEVEL SECURITY;
ALTER TABLE seer ENABLE ROW LEVEL SECURITY;
ALTER TABLE aethelred_house ENABLE ROW LEVEL SECURITY;
ALTER TABLE curator ENABLE ROW LEVEL SECURITY;
ALTER TABLE archivist ENABLE ROW LEVEL SECURITY;
ALTER TABLE skald ENABLE ROW LEVEL SECURITY;
ALTER TABLE codex ENABLE ROW LEVEL SECURITY;
ALTER TABLE executioner ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 Connection Tables Policies (Admin Only)
-- =====================================================
CREATE POLICY "Admins can view supabase connection"
    ON supabase_connection FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Admins can manage supabase connection"
    ON supabase_connection FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Same pattern for stripe, resend, vercel, github connections
CREATE POLICY "Admins can view stripe connection"
    ON stripe_connection FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Admins can manage stripe connection"
    ON stripe_connection FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Admins can view resend connection"
    ON resend_connection FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Admins can manage resend connection"
    ON resend_connection FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Admins can view vercel connection"
    ON vercel_connection FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Admins can manage vercel connection"
    ON vercel_connection FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Admins can view github connection"
    ON github_connection FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Admins can manage github connection"
    ON github_connection FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- =====================================================
-- 3.3 AUDHDITIES Platform Policies
-- =====================================================
CREATE POLICY "Public can view platform status"
    ON audhdities_platform FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage platform"
    ON audhdities_platform FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- =====================================================
-- 3.4 Consciousness Policies
-- =====================================================
CREATE POLICY "Quantum Weaver can view consciousness"
    ON consciousness FOR SELECT
    USING (auth.uid() = quantum_weaver_id);

CREATE POLICY "Admins can view consciousness"
    ON consciousness FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "Quantum Weaver can update consciousness"
    ON consciousness FOR UPDATE
    USING (auth.uid() = quantum_weaver_id);

CREATE POLICY "Admins can manage consciousness"
    ON consciousness FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- =====================================================
-- 3.5 Council Houses Policies
-- =====================================================
CREATE POLICY "Public can view council houses"
    ON council_houses FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage council houses"
    ON council_houses FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- =====================================================
-- 3.6 Individual House Policies
-- =====================================================
CREATE POLICY "Public can view hearth_keeper"
    ON hearth_keeper FOR SELECT
    USING (EXISTS (SELECT 1 FROM council_houses WHERE id = hearth_keeper.id AND is_active = true));

CREATE POLICY "Admins can manage hearth_keeper"
    ON hearth_keeper FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Same pattern for all houses (chancellor, seer, aethelred_house, curator, archivist, skald, codex, executioner)
-- Apply to each house table with the same policy structure