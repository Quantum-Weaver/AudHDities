-- =====================================================
-- 2.1 ACID_TEST_QUESTIONS
-- =====================================================
CREATE TABLE acid_test_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_type acid_question_type NOT NULL DEFAULT 'multiple_choice',
    order_index INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    category TEXT,
    weight INTEGER DEFAULT 5 CHECK (weight BETWEEN 1 AND 10),
    explanation TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.2 ACID_TEST_ANSWERS
-- =====================================================
CREATE TABLE acid_test_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID NOT NULL REFERENCES acid_test_questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    score_value INTEGER,
    indicates_nd BOOLEAN DEFAULT FALSE,
    ally_tier_price DECIMAL(10,2),
    persona_contribution JSONB DEFAULT '{}',
    order_index INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.3 ACID_TEST_RESULTS
-- =====================================================
CREATE TABLE acid_test_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    total_score INTEGER,
    persona_label acid_persona,
    persona_description TEXT,
    suggested_tier user_tier,
    answers JSONB DEFAULT '{}',
    scores_by_category JSONB DEFAULT '{}',
    recommendations JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- =====================================================
-- 2.4 ETYMOLOGY
-- =====================================================
CREATE TABLE etymology (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    word TEXT NOT NULL,
    language TEXT NOT NULL,
    root TEXT,
    original_meaning TEXT NOT NULL,
    current_meaning TEXT NOT NULL,
    semantic_shift TEXT,
    related_words TEXT[] DEFAULT '{}',
    cultural_context TEXT,
    contributor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.5 TAXONOMY
-- =====================================================
CREATE TABLE taxonomy (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES taxonomy(id) ON DELETE SET NULL,
    node_type taxonomy_node_type NOT NULL DEFAULT 'concept',
    domain TEXT,
    level INTEGER DEFAULT 0,
    path TEXT NOT NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for hierarchical queries
CREATE INDEX idx_taxonomy_parent ON taxonomy(parent_id);
CREATE INDEX idx_taxonomy_path ON taxonomy(path);
CREATE INDEX idx_taxonomy_domain ON taxonomy(domain);

-- =====================================================
-- 2.6 ONTOLOGY
-- =====================================================
CREATE TABLE ontology (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID NOT NULL REFERENCES taxonomy(id) ON DELETE RESTRICT,
    object_id UUID NOT NULL REFERENCES taxonomy(id) ON DELETE RESTRICT,
    predicate ontology_predicate NOT NULL,
    weight DECIMAL(3,2) DEFAULT 1.0 CHECK (weight BETWEEN 0 AND 1),
    description TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(subject_id, object_id, predicate)
);

-- Indexes for ontology queries
CREATE INDEX idx_ontology_subject ON ontology(subject_id);
CREATE INDEX idx_ontology_object ON ontology(object_id);
CREATE INDEX idx_ontology_predicate ON ontology(predicate);

-- =====================================================
-- 2.7 FOLKSONOMY
-- =====================================================
CREATE TABLE folksonomy (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tag TEXT NOT NULL,
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
    target_type folksonomy_target_type NOT NULL,
    target_id UUID NOT NULL,
    weight INTEGER DEFAULT 5 CHECK (weight BETWEEN 1 AND 10),
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tag, target_type, target_id, creator_id)
);

-- Indexes for folksonomy queries
CREATE INDEX idx_folksonomy_tag ON folksonomy(tag);
CREATE INDEX idx_folksonomy_target ON folksonomy(target_type, target_id);
CREATE INDEX idx_folksonomy_creator ON folksonomy(creator_id);

-- =====================================================
-- 2.8 SUPERPOSITION
-- =====================================================
CREATE TABLE superposition (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    concept_id UUID NOT NULL REFERENCES taxonomy(id) ON DELETE CASCADE,
    possible_meanings JSONB NOT NULL,
    probability_distribution JSONB NOT NULL,
    observer_count INTEGER DEFAULT 0,
    collapse_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status superposition_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(concept_id)
);

-- =====================================================
-- 2.9 QUANTUM_SUPERPOSITION
-- =====================================================
CREATE TABLE quantum_superposition (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    superposition_id UUID NOT NULL REFERENCES superposition(id) ON DELETE CASCADE,
    chosen_meaning TEXT NOT NULL,
    collapse_reason TEXT,
    confidence INTEGER NOT NULL CHECK (confidence BETWEEN 1 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, superposition_id)
);

-- Index for quantum superposition queries
CREATE INDEX idx_quantum_superposition_user ON quantum_superposition(user_id);
CREATE INDEX idx_quantum_superposition_superposition ON quantum_superposition(superposition_id);