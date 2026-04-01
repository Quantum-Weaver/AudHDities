-- =====================================================
-- ENUMS for Assessment & Discovery
-- =====================================================

-- Acid test question types
CREATE TYPE acid_question_type AS ENUM (
    'multiple_choice',
    'slider',
    'checkbox',
    'scale',
    'text'
);

-- Acid test persona labels
CREATE TYPE acid_persona AS ENUM (
    'masked_traveler',   -- High masking, high survival
    'tab_hoarder',       -- Information seeker, deep dives
    'seam_warrior',      -- Sensory sensitive, fabric/texture aware
    'void_dweller',      -- Internal world rich, external distant
    'pattern_seeker',    -- Systemizer, pattern recognizer
    'quantum_witness'    -- Sees multiple realities simultaneously
);

-- Taxonomy node types
CREATE TYPE taxonomy_node_type AS ENUM (
    'domain',
    'category',
    'concept',
    'relationship',
    'attribute'
);

-- Ontology relationship predicates
CREATE TYPE ontology_predicate AS ENUM (
    'parent_of',
    'related_to',
    'requires',
    'contradicts',
    'evolves_to',
    'inspired_by'
);

-- Folksonomy target types
CREATE TYPE folksonomy_target_type AS ENUM (
    'post',
    'product',
    'comment',
    'profile',
    'quest',
    'myth',
    'lesson',
    'scene'
);

-- Superposition status
CREATE TYPE superposition_status AS ENUM (
    'active',
    'collapsed',
    'archived'
);