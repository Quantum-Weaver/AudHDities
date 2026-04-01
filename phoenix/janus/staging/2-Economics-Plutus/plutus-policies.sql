-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE residual_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE covenant_pool ENABLE ROW LEVEL SECURITY;
ALTER TABLE residual_pool ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE disbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertising ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 PRODUCTS Policies
-- =====================================================
-- Public can view published products
CREATE POLICY "Public can view published products"
    ON products FOR SELECT
    USING (is_published = true AND active = true);

-- Creators/vendors can view their own products
CREATE POLICY "Owners can view their products"
    ON products FOR SELECT
    USING (auth.uid() = creator_id);

-- Creators/vendors can insert products
CREATE POLICY "Owners can insert products"
    ON products FOR INSERT
    WITH CHECK (auth.uid() = creator_id);

-- Creators/vendors can update own products
CREATE POLICY "Owners can update own products"
    ON products FOR UPDATE
    USING (auth.uid() = creator_id);

-- Admins have full access
CREATE POLICY "Admins have full access to products"
    ON products FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 SALES Policies
-- =====================================================
-- Buyers can view their own purchases
CREATE POLICY "Buyers can view own purchases"
    ON sales FOR SELECT
    USING (auth.uid() = buyer_id);

-- Creators/vendors can view sales of their products
CREATE POLICY "Creators can view sales of their products"
    ON sales FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = sales.product_id 
            AND products.creator_id = auth.uid()
        )
    );

-- Admins have full access
CREATE POLICY "Admins have full access to sales"
    ON sales FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 CONTRIBUTIONS Policies
-- =====================================================
-- Public can view contributions
CREATE POLICY "Public can view contributions"
    ON contributions FOR SELECT
    USING (true);

-- Product creators can manage contributions
CREATE POLICY "Product creators can manage contributions"
    ON contributions FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = contributions.product_id 
            AND products.creator_id = auth.uid()
        )
    );

-- Admins have full access
CREATE POLICY "Admins have full access to contributions"
    ON contributions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.5 RESIDUAL_PAYOUTS Policies
-- =====================================================
-- Contributors can view their own payouts
CREATE POLICY "Contributors can view own payouts"
    ON residual_payouts FOR SELECT
    USING (auth.uid() = contributor_id);

-- Product creators can view payouts from their products
CREATE POLICY "Creators can view payouts for their products"
    ON residual_payouts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = residual_payouts.product_id 
            AND products.creator_id = auth.uid()
        )
    );

-- Admins have full access
CREATE POLICY "Admins have full access to residual payouts"
    ON residual_payouts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 SUBSCRIPTIONS Policies
-- =====================================================
-- Subscribers can view their own subscriptions
CREATE POLICY "Subscribers can view own subscriptions"
    ON subscriptions FOR SELECT
    USING (auth.uid() = subscriber_id);

-- Channel owners can view subscribers
CREATE POLICY "Channel owners can view subscribers"
    ON subscriptions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM channels 
            WHERE channels.id = subscriptions.channel_id 
            AND channels.owner_id = auth.uid()
        )
    );

-- Admins have full access
CREATE POLICY "Admins have full access to subscriptions"
    ON subscriptions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 TRANSACTIONS Policies
-- =====================================================
-- Users can view transactions they are part of
CREATE POLICY "Users can view own transactions"
    ON transactions FOR SELECT
    USING (auth.uid() = from_id OR auth.uid() = to_id);

-- Admins have full access
CREATE POLICY "Admins have full access to transactions"
    ON transactions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.8 COVENANT_POOL Policies
-- =====================================================
-- Users can view their own covenant pool
CREATE POLICY "Users can view own covenant pool"
    ON covenant_pool FOR SELECT
    USING (auth.uid() = user_id);

-- Users can update their own pledge
CREATE POLICY "Users can update own covenant pledge"
    ON covenant_pool FOR UPDATE
    USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to covenant pool"
    ON covenant_pool FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.9 RESIDUAL_POOL Policies
-- =====================================================
-- Product creators can view residual pool for their products
CREATE POLICY "Creators can view residual pool"
    ON residual_pool FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = residual_pool.product_id 
            AND products.creator_id = auth.uid()
        )
    );

-- Admins have full access
CREATE POLICY "Admins have full access to residual pool"
    ON residual_pool FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.10 LEDGER Policies (Public)
-- =====================================================
-- Everyone can view the public ledger
CREATE POLICY "Public can view ledger"
    ON ledger FOR SELECT
    USING (true);

-- Only admins can insert/update ledger
CREATE POLICY "Only admins can modify ledger"
    ON ledger FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.11 DISBURSEMENTS Policies
-- =====================================================
-- Admins only
CREATE POLICY "Admins have full access to disbursements"
    ON disbursements FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.12 PAYOUTS Policies
-- =====================================================
-- Recipients can view their own payouts
CREATE POLICY "Recipients can view own payouts"
    ON payouts FOR SELECT
    USING (auth.uid() = recipient_id);

-- Admins have full access
CREATE POLICY "Admins have full access to payouts"
    ON payouts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.13 ADVERTISING Policies
-- =====================================================
-- Advertisers can view their own campaigns
CREATE POLICY "Advertisers can view own campaigns"
    ON advertising FOR SELECT
    USING (auth.uid() = advertiser_id);

-- Advertisers can manage own campaigns
CREATE POLICY "Advertisers can manage own campaigns"
    ON advertising FOR ALL
    USING (auth.uid() = advertiser_id);

-- Admins have full access
CREATE POLICY "Admins have full access to advertising"
    ON advertising FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));