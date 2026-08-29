export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      atoms: {
        Row: {
          affinity: number | null
          atom_type: Database["public"]["Enums"]["atom_type"]
          atom_word: string
          category: string | null
          category_name: string | null
          created_at: string
          created_by: string | null
          definition: string
          etymology_id: string | null
          id: string
          modifiers: Json | null
          pascal_case: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          screaming_case: string | null
          sensory_id: string | null
          snake_case: string | null
          state: Database["public"]["Enums"]["atom_state"]
          status: string
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
          valence: number | null
          weight: number | null
        }
        Insert: {
          affinity?: number | null
          atom_type: Database["public"]["Enums"]["atom_type"]
          atom_word: string
          category?: string | null
          category_name?: string | null
          created_at?: string
          created_by?: string | null
          definition: string
          etymology_id?: string | null
          id?: string
          modifiers?: Json | null
          pascal_case?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screaming_case?: string | null
          sensory_id?: string | null
          snake_case?: string | null
          state?: Database["public"]["Enums"]["atom_state"]
          status?: string
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
          valence?: number | null
          weight?: number | null
        }
        Update: {
          affinity?: number | null
          atom_type?: Database["public"]["Enums"]["atom_type"]
          atom_word?: string
          category?: string | null
          category_name?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string
          etymology_id?: string | null
          id?: string
          modifiers?: Json | null
          pascal_case?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screaming_case?: string | null
          sensory_id?: string | null
          snake_case?: string | null
          state?: Database["public"]["Enums"]["atom_state"]
          status?: string
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
          valence?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "atoms_category_id_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      awen: {
        Row: {
          atom_id: string | null
          created_at: string
          created_by: string | null
          definition: string | null
          folksonomy_type: string | null
          home: string | null
          icon_emoji: string | null
          id: string
          molecule_id: string | null
          name: string
          organism_id: string | null
          slug: string
          status: string
          story: string | null
          tool_type: Database["public"]["Enums"]["tool_type"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          atom_id?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          folksonomy_type?: string | null
          home?: string | null
          icon_emoji?: string | null
          id?: string
          molecule_id?: string | null
          name: string
          organism_id?: string | null
          slug: string
          status?: string
          story?: string | null
          tool_type: Database["public"]["Enums"]["tool_type"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          atom_id?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          folksonomy_type?: string | null
          home?: string | null
          icon_emoji?: string | null
          id?: string
          molecule_id?: string | null
          name?: string
          organism_id?: string | null
          slug?: string
          status?: string
          story?: string | null
          tool_type?: Database["public"]["Enums"]["tool_type"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tools_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "tools_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tools_folksonomy_type_fkey"
            columns: ["folksonomy_type"]
            isOneToOne: false
            referencedRelation: "folksonomies"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "tools_molecule_id_fkey"
            columns: ["molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tools_organism_id_fkey"
            columns: ["organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
        ]
      }
      beacons: {
        Row: {
          atom_id: string | null
          audhdities_app_id: string | null
          audhdities_listing_url: string | null
          audhdities_price_cents: number | null
          audhdities_published_at: string | null
          audhdities_published_version: string | null
          audhdities_status: string
          audhdities_testing_url: string | null
          audhdities_testing_version: string | null
          available_on: string[]
          beacon_type: Database["public"]["Enums"]["beacon_type"]
          created_at: string
          created_by: string | null
          currency: string
          definition: string | null
          folksonomy_type: string | null
          galaxy_app_id: string | null
          galaxy_listing_url: string | null
          galaxy_price_cents: number | null
          galaxy_published_at: string | null
          galaxy_published_version: string | null
          galaxy_status: string
          galaxy_testing_url: string | null
          galaxy_testing_version: string | null
          home: string | null
          icon_emoji: string | null
          id: string
          is_public: boolean
          microsoft_app_id: string | null
          microsoft_listing_url: string | null
          microsoft_price_cents: number | null
          microsoft_published_at: string | null
          microsoft_published_version: string | null
          microsoft_status: string
          microsoft_testing_url: string | null
          microsoft_testing_version: string | null
          molecule_id: string | null
          name: string
          organism_id: string | null
          play_app_id: string | null
          play_listing_url: string | null
          play_price_cents: number | null
          play_published_at: string | null
          play_published_version: string | null
          play_status: string
          play_testing_url: string | null
          play_testing_version: string | null
          repo_url: string | null
          slug: string
          status: string
          store_notes: string | null
          story: string | null
          updated_at: string
          updated_by: string | null
          version: string | null
        }
        Insert: {
          atom_id?: string | null
          audhdities_app_id?: string | null
          audhdities_listing_url?: string | null
          audhdities_price_cents?: number | null
          audhdities_published_at?: string | null
          audhdities_published_version?: string | null
          audhdities_status?: string
          audhdities_testing_url?: string | null
          audhdities_testing_version?: string | null
          available_on?: string[]
          beacon_type: Database["public"]["Enums"]["beacon_type"]
          created_at?: string
          created_by?: string | null
          currency?: string
          definition?: string | null
          folksonomy_type?: string | null
          galaxy_app_id?: string | null
          galaxy_listing_url?: string | null
          galaxy_price_cents?: number | null
          galaxy_published_at?: string | null
          galaxy_published_version?: string | null
          galaxy_status?: string
          galaxy_testing_url?: string | null
          galaxy_testing_version?: string | null
          home?: string | null
          icon_emoji?: string | null
          id?: string
          is_public?: boolean
          microsoft_app_id?: string | null
          microsoft_listing_url?: string | null
          microsoft_price_cents?: number | null
          microsoft_published_at?: string | null
          microsoft_published_version?: string | null
          microsoft_status?: string
          microsoft_testing_url?: string | null
          microsoft_testing_version?: string | null
          molecule_id?: string | null
          name: string
          organism_id?: string | null
          play_app_id?: string | null
          play_listing_url?: string | null
          play_price_cents?: number | null
          play_published_at?: string | null
          play_published_version?: string | null
          play_status?: string
          play_testing_url?: string | null
          play_testing_version?: string | null
          repo_url?: string | null
          slug: string
          status?: string
          store_notes?: string | null
          story?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: string | null
        }
        Update: {
          atom_id?: string | null
          audhdities_app_id?: string | null
          audhdities_listing_url?: string | null
          audhdities_price_cents?: number | null
          audhdities_published_at?: string | null
          audhdities_published_version?: string | null
          audhdities_status?: string
          audhdities_testing_url?: string | null
          audhdities_testing_version?: string | null
          available_on?: string[]
          beacon_type?: Database["public"]["Enums"]["beacon_type"]
          created_at?: string
          created_by?: string | null
          currency?: string
          definition?: string | null
          folksonomy_type?: string | null
          galaxy_app_id?: string | null
          galaxy_listing_url?: string | null
          galaxy_price_cents?: number | null
          galaxy_published_at?: string | null
          galaxy_published_version?: string | null
          galaxy_status?: string
          galaxy_testing_url?: string | null
          galaxy_testing_version?: string | null
          home?: string | null
          icon_emoji?: string | null
          id?: string
          is_public?: boolean
          microsoft_app_id?: string | null
          microsoft_listing_url?: string | null
          microsoft_price_cents?: number | null
          microsoft_published_at?: string | null
          microsoft_published_version?: string | null
          microsoft_status?: string
          microsoft_testing_url?: string | null
          microsoft_testing_version?: string | null
          molecule_id?: string | null
          name?: string
          organism_id?: string | null
          play_app_id?: string | null
          play_listing_url?: string | null
          play_price_cents?: number | null
          play_published_at?: string | null
          play_published_version?: string | null
          play_status?: string
          play_testing_url?: string | null
          play_testing_version?: string | null
          repo_url?: string | null
          slug?: string
          status?: string
          store_notes?: string | null
          story?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resonance_beacons_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "resonance_beacons_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resonance_beacons_molecule_id_fkey"
            columns: ["molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resonance_beacons_organism_id_fkey"
            columns: ["organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon_emoji: string | null
          id: string
          molecule_id: string | null
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          molecule_id?: string | null
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          molecule_id?: string | null
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_molecule_id_fkey"
            columns: ["molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
        ]
      }
      classification_path_steps: {
        Row: {
          created_at: string
          id: string
          member_atom_id: string | null
          member_molecule_id: string | null
          member_organism_id: string | null
          path_id: string
          position: number
          scheme_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          member_atom_id?: string | null
          member_molecule_id?: string | null
          member_organism_id?: string | null
          path_id: string
          position: number
          scheme_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          member_atom_id?: string | null
          member_molecule_id?: string | null
          member_organism_id?: string | null
          path_id?: string
          position?: number
          scheme_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classification_path_steps_member_atom_id_fkey"
            columns: ["member_atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "classification_path_steps_member_atom_id_fkey"
            columns: ["member_atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_path_steps_member_molecule_id_fkey"
            columns: ["member_molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_path_steps_member_organism_id_fkey"
            columns: ["member_organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_path_steps_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "classification_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_path_steps_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      classification_paths: {
        Row: {
          asserted_by: string | null
          classifier_version: string | null
          confidence: number | null
          created_at: string
          created_by: string | null
          derivation: string | null
          id: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          subject_atom_id: string | null
          subject_molecule_id: string | null
          subject_organism_id: string | null
          submitted_by: string | null
          system_coherence: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          asserted_by?: string | null
          classifier_version?: string | null
          confidence?: number | null
          created_at?: string
          created_by?: string | null
          derivation?: string | null
          id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          subject_atom_id?: string | null
          subject_molecule_id?: string | null
          subject_organism_id?: string | null
          submitted_by?: string | null
          system_coherence?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          asserted_by?: string | null
          classifier_version?: string | null
          confidence?: number | null
          created_at?: string
          created_by?: string | null
          derivation?: string | null
          id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          subject_atom_id?: string | null
          subject_molecule_id?: string | null
          subject_organism_id?: string | null
          submitted_by?: string | null
          system_coherence?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classification_paths_subject_atom_id_fkey"
            columns: ["subject_atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "classification_paths_subject_atom_id_fkey"
            columns: ["subject_atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_paths_subject_molecule_id_fkey"
            columns: ["subject_molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classification_paths_subject_organism_id_fkey"
            columns: ["subject_organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
        ]
      }
      columns: {
        Row: {
          archived_at: string | null
          column_default: string | null
          column_name: string
          created_at: string
          created_by: string | null
          data_type: string | null
          description: string | null
          id: string
          is_active: boolean
          is_nullable: boolean | null
          last_seen_at: string | null
          log: Json
          table_name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          archived_at?: string | null
          column_default?: string | null
          column_name: string
          created_at?: string
          created_by?: string | null
          data_type?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_nullable?: boolean | null
          last_seen_at?: string | null
          log?: Json
          table_name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          archived_at?: string | null
          column_default?: string | null
          column_name?: string
          created_at?: string
          created_by?: string | null
          data_type?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_nullable?: boolean | null
          last_seen_at?: string | null
          log?: Json
          table_name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      composite_types: {
        Row: {
          archived_at: string | null
          attributes: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          log: Json
          name: string
          updated_at: string
          updated_by: string | null
          used_by: Json | null
        }
        Insert: {
          archived_at?: string | null
          attributes?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          name: string
          updated_at?: string
          updated_by?: string | null
          used_by?: Json | null
        }
        Update: {
          archived_at?: string | null
          attributes?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          name?: string
          updated_at?: string
          updated_by?: string | null
          used_by?: Json | null
        }
        Relationships: []
      }
      concept_relations: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          note: string | null
          object_atom_id: string | null
          object_molecule_id: string | null
          object_organism_id: string | null
          relation_type: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scheme_anchor: string | null
          scheme_id: string | null
          status: string
          subject_atom_id: string | null
          subject_molecule_id: string | null
          subject_organism_id: string | null
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          object_atom_id?: string | null
          object_molecule_id?: string | null
          object_organism_id?: string | null
          relation_type: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheme_anchor?: string | null
          scheme_id?: string | null
          status?: string
          subject_atom_id?: string | null
          subject_molecule_id?: string | null
          subject_organism_id?: string | null
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          object_atom_id?: string | null
          object_molecule_id?: string | null
          object_organism_id?: string | null
          relation_type?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheme_anchor?: string | null
          scheme_id?: string | null
          status?: string
          subject_atom_id?: string | null
          subject_molecule_id?: string | null
          subject_organism_id?: string | null
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concept_relations_object_atom_id_fkey"
            columns: ["object_atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "concept_relations_object_atom_id_fkey"
            columns: ["object_atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_relations_object_molecule_id_fkey"
            columns: ["object_molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_relations_object_organism_id_fkey"
            columns: ["object_organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_relations_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_relations_subject_atom_id_fkey"
            columns: ["subject_atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "concept_relations_subject_atom_id_fkey"
            columns: ["subject_atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_relations_subject_molecule_id_fkey"
            columns: ["subject_molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_relations_subject_organism_id_fkey"
            columns: ["subject_organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
        ]
      }
      enums: {
        Row: {
          archived_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          labels: Json | null
          last_seen_at: string | null
          log: Json
          name: string
          updated_at: string
          updated_by: string | null
          used_by: Json | null
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          labels?: Json | null
          last_seen_at?: string | null
          log?: Json
          name: string
          updated_at?: string
          updated_by?: string | null
          used_by?: Json | null
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          labels?: Json | null
          last_seen_at?: string | null
          log?: Json
          name?: string
          updated_at?: string
          updated_by?: string | null
          used_by?: Json | null
        }
        Relationships: []
      }
      etymology: {
        Row: {
          atom_id: string
          atom_word: string
          completion_progress: number | null
          created_at: string
          historical_meaning: string | null
          id: string
          root_language: string | null
          root_word: string | null
          sanctuary_meaning: string | null
          updated_at: string
        }
        Insert: {
          atom_id: string
          atom_word: string
          completion_progress?: number | null
          created_at?: string
          historical_meaning?: string | null
          id?: string
          root_language?: string | null
          root_word?: string | null
          sanctuary_meaning?: string | null
          updated_at?: string
        }
        Update: {
          atom_id?: string
          atom_word?: string
          completion_progress?: number | null
          created_at?: string
          historical_meaning?: string | null
          id?: string
          root_language?: string | null
          root_word?: string | null
          sanctuary_meaning?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "etymology_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: true
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "etymology_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: true
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
        ]
      }
      folksonomies: {
        Row: {
          created_at: string
          created_by: string | null
          name: string
          notes: string | null
          purpose: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          name: string
          notes?: string | null
          purpose: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          name?: string
          notes?: string | null
          purpose?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      functions: {
        Row: {
          archived_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          language: string | null
          last_seen_at: string | null
          log: Json
          name: string
          purpose: string | null
          returns: string | null
          signature: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          language?: string | null
          last_seen_at?: string | null
          log?: Json
          name: string
          purpose?: string | null
          returns?: string | null
          signature?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          language?: string | null
          last_seen_at?: string | null
          log?: Json
          name?: string
          purpose?: string | null
          returns?: string | null
          signature?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      gaia_config: {
        Row: {
          api_access: string | null
          archived_at: string | null
          composite_refs: Json | null
          created_at: string
          created_by: string | null
          deity_group: string | null
          deity_name: string | null
          enum_refs: Json | null
          family_ref: string | null
          generation_dependencies: Json | null
          generation_flags: Json | null
          generation_targets: Json | null
          handling_level: string | null
          human_verified_tags: Json | null
          icon_emoji: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          log: Json
          notes: string | null
          schema_columns_count: number | null
          schema_hash: string | null
          schema_indexes_count: number | null
          schema_notes: string | null
          schema_policies_count: number | null
          schema_triggers_count: number | null
          schema_verified_at: string | null
          scheme_id: string | null
          script_id: string | null
          sort_order: number | null
          status: string
          table_name: string
          template_id: string | null
          updated_at: string
          updated_by: string | null
          visibility: string | null
        }
        Insert: {
          api_access?: string | null
          archived_at?: string | null
          composite_refs?: Json | null
          created_at?: string
          created_by?: string | null
          deity_group?: string | null
          deity_name?: string | null
          enum_refs?: Json | null
          family_ref?: string | null
          generation_dependencies?: Json | null
          generation_flags?: Json | null
          generation_targets?: Json | null
          handling_level?: string | null
          human_verified_tags?: Json | null
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          notes?: string | null
          schema_columns_count?: number | null
          schema_hash?: string | null
          schema_indexes_count?: number | null
          schema_notes?: string | null
          schema_policies_count?: number | null
          schema_triggers_count?: number | null
          schema_verified_at?: string | null
          scheme_id?: string | null
          script_id?: string | null
          sort_order?: number | null
          status?: string
          table_name: string
          template_id?: string | null
          updated_at?: string
          updated_by?: string | null
          visibility?: string | null
        }
        Update: {
          api_access?: string | null
          archived_at?: string | null
          composite_refs?: Json | null
          created_at?: string
          created_by?: string | null
          deity_group?: string | null
          deity_name?: string | null
          enum_refs?: Json | null
          family_ref?: string | null
          generation_dependencies?: Json | null
          generation_flags?: Json | null
          generation_targets?: Json | null
          handling_level?: string | null
          human_verified_tags?: Json | null
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          notes?: string | null
          schema_columns_count?: number | null
          schema_hash?: string | null
          schema_indexes_count?: number | null
          schema_notes?: string | null
          schema_policies_count?: number | null
          schema_triggers_count?: number | null
          schema_verified_at?: string | null
          scheme_id?: string | null
          script_id?: string | null
          sort_order?: number | null
          status?: string
          table_name?: string
          template_id?: string | null
          updated_at?: string
          updated_by?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gaia_config_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gaia_config_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gaia_config_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      indexes: {
        Row: {
          archived_at: string | null
          columns: string | null
          created_at: string
          created_by: string | null
          definition: string | null
          description: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          log: Json
          name: string
          table_name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          archived_at?: string | null
          columns?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          name: string
          table_name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          archived_at?: string | null
          columns?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          name?: string
          table_name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      molecule_atoms: {
        Row: {
          atom_id: string
          bond_strength: number | null
          bond_type: Database["public"]["Enums"]["bond_type"]
          created_at: string
          id: string
          molecule_id: string
          position: number
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role: Database["public"]["Enums"]["atom_role"]
          status: string
          submitted_by: string | null
          updated_at: string
        }
        Insert: {
          atom_id: string
          bond_strength?: number | null
          bond_type?: Database["public"]["Enums"]["bond_type"]
          created_at?: string
          id?: string
          molecule_id: string
          position: number
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role: Database["public"]["Enums"]["atom_role"]
          status?: string
          submitted_by?: string | null
          updated_at?: string
        }
        Update: {
          atom_id?: string
          bond_strength?: number | null
          bond_type?: Database["public"]["Enums"]["bond_type"]
          created_at?: string
          id?: string
          molecule_id?: string
          position?: number
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: Database["public"]["Enums"]["atom_role"]
          status?: string
          submitted_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "molecule_atoms_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "molecule_atoms_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "molecule_atoms_molecule_id_fkey"
            columns: ["molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
        ]
      }
      molecules: {
        Row: {
          atom_words: string | null
          bond_type: Database["public"]["Enums"]["bond_type"]
          camel_case: string | null
          created_at: string
          created_by: string | null
          definition: string | null
          derived_name: string | null
          domain: Database["public"]["Enums"]["molecule_domain"] | null
          etymology_id: string | null
          functional_group:
            | Database["public"]["Enums"]["functional_group"]
            | null
          id: string
          kebab_case: string | null
          molecule_type: Database["public"]["Enums"]["molecule_type"]
          name: string
          naming_convention: Database["public"]["Enums"]["naming_convention"]
          pascal_case: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          screaming_case: string | null
          sensory_override: Json | null
          snake_case: string | null
          status: string
          submitted_by: string | null
          total_weight: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          atom_words?: string | null
          bond_type?: Database["public"]["Enums"]["bond_type"]
          camel_case?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          derived_name?: string | null
          domain?: Database["public"]["Enums"]["molecule_domain"] | null
          etymology_id?: string | null
          functional_group?:
            | Database["public"]["Enums"]["functional_group"]
            | null
          id?: string
          kebab_case?: string | null
          molecule_type: Database["public"]["Enums"]["molecule_type"]
          name: string
          naming_convention: Database["public"]["Enums"]["naming_convention"]
          pascal_case?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screaming_case?: string | null
          sensory_override?: Json | null
          snake_case?: string | null
          status?: string
          submitted_by?: string | null
          total_weight?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          atom_words?: string | null
          bond_type?: Database["public"]["Enums"]["bond_type"]
          camel_case?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          derived_name?: string | null
          domain?: Database["public"]["Enums"]["molecule_domain"] | null
          etymology_id?: string | null
          functional_group?:
            | Database["public"]["Enums"]["functional_group"]
            | null
          id?: string
          kebab_case?: string | null
          molecule_type?: Database["public"]["Enums"]["molecule_type"]
          name?: string
          naming_convention?: Database["public"]["Enums"]["naming_convention"]
          pascal_case?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screaming_case?: string | null
          sensory_override?: Json | null
          snake_case?: string | null
          status?: string
          submitted_by?: string | null
          total_weight?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      organism_atoms: {
        Row: {
          atom_id: string
          bond_strength: number
          created_at: string
          id: string
          organism_id: string
          position: number
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role: string
          status: string
          submitted_by: string | null
          updated_at: string
        }
        Insert: {
          atom_id: string
          bond_strength?: number
          created_at?: string
          id?: string
          organism_id: string
          position: number
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string
          status?: string
          submitted_by?: string | null
          updated_at?: string
        }
        Update: {
          atom_id?: string
          bond_strength?: number
          created_at?: string
          id?: string
          organism_id?: string
          position?: number
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string
          status?: string
          submitted_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organism_atoms_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "organism_atoms_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organism_atoms_organism_id_fkey"
            columns: ["organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
        ]
      }
      organism_molecules: {
        Row: {
          bond_strength: number | null
          bond_type: string | null
          created_at: string
          id: string
          molecule_id: string
          organism_id: string
          position: number | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role: string | null
          status: string
          submitted_by: string | null
          updated_at: string
        }
        Insert: {
          bond_strength?: number | null
          bond_type?: string | null
          created_at?: string
          id?: string
          molecule_id: string
          organism_id: string
          position?: number | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string | null
          status?: string
          submitted_by?: string | null
          updated_at?: string
        }
        Update: {
          bond_strength?: number | null
          bond_type?: string | null
          created_at?: string
          id?: string
          molecule_id?: string
          organism_id?: string
          position?: number | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string | null
          status?: string
          submitted_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organism_molecules_molecule_id_fkey"
            columns: ["molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organism_molecules_organism_id_fkey"
            columns: ["organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
        ]
      }
      organisms: {
        Row: {
          acronym: string | null
          camel_case: string | null
          created_at: string
          created_by: string | null
          definition: string | null
          domain: string | null
          etymology_id: string | null
          habitat: string | null
          id: string
          kebab_case: string | null
          lifecycle: string | null
          name: string
          organism_type: string | null
          pascal_case: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          screaming_case: string | null
          sensory_override: string | null
          snake_case: string | null
          status: string
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          acronym?: string | null
          camel_case?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          domain?: string | null
          etymology_id?: string | null
          habitat?: string | null
          id?: string
          kebab_case?: string | null
          lifecycle?: string | null
          name: string
          organism_type?: string | null
          pascal_case?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screaming_case?: string | null
          sensory_override?: string | null
          snake_case?: string | null
          status?: string
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          acronym?: string | null
          camel_case?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          domain?: string | null
          etymology_id?: string | null
          habitat?: string | null
          id?: string
          kebab_case?: string | null
          lifecycle?: string | null
          name?: string
          organism_type?: string | null
          pascal_case?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screaming_case?: string | null
          sensory_override?: string | null
          snake_case?: string | null
          status?: string
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      pantheon: {
        Row: {
          color_hex: string | null
          color_token: string | null
          created_at: string
          deity_name: string
          description: string | null
          icon_emoji: string | null
          id: string
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          color_hex?: string | null
          color_token?: string | null
          created_at?: string
          deity_name: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          color_hex?: string | null
          color_token?: string | null
          created_at?: string
          deity_name?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      policies: {
        Row: {
          archived_at: string | null
          cmd: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          log: Json
          policy_name: string
          qual: string | null
          table_name: string
          updated_at: string
          updated_by: string | null
          with_check: string | null
        }
        Insert: {
          archived_at?: string | null
          cmd?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          policy_name: string
          qual?: string | null
          table_name: string
          updated_at?: string
          updated_by?: string | null
          with_check?: string | null
        }
        Update: {
          archived_at?: string | null
          cmd?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          policy_name?: string
          qual?: string | null
          table_name?: string
          updated_at?: string
          updated_by?: string | null
          with_check?: string | null
        }
        Relationships: []
      }
      relationships: {
        Row: {
          archived_at: string | null
          columns: Json
          constraint_name: string
          created_at: string
          created_by: string | null
          description: string | null
          foreign_columns: Json
          foreign_table: string
          id: string
          is_active: boolean
          last_seen_at: string | null
          log: Json
          on_delete: string | null
          on_update: string | null
          one_to_one: boolean
          table_name: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          columns?: Json
          constraint_name: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          foreign_columns?: Json
          foreign_table: string
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          on_delete?: string | null
          on_update?: string | null
          one_to_one?: boolean
          table_name: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          columns?: Json
          constraint_name?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          foreign_columns?: Json
          foreign_table?: string
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          on_delete?: string | null
          on_update?: string | null
          one_to_one?: boolean
          table_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          created_by: string | null
          doors: string
          kind: string
          name: string
          notes: string | null
          purpose: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          doors: string
          kind: string
          name: string
          notes?: string | null
          purpose: string
          sort_order: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          doors?: string
          kind?: string
          name?: string
          notes?: string | null
          purpose?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      scheme_memberships: {
        Row: {
          atom_id: string | null
          created_at: string
          created_by: string | null
          id: string
          is_primary: boolean
          molecule_id: string | null
          note: string | null
          organism_id: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scheme_id: string
          sort_order: number | null
          status: string
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          atom_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_primary?: boolean
          molecule_id?: string | null
          note?: string | null
          organism_id?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheme_id: string
          sort_order?: number | null
          status?: string
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          atom_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_primary?: boolean
          molecule_id?: string | null
          note?: string | null
          organism_id?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheme_id?: string
          sort_order?: number | null
          status?: string
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheme_memberships_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "scheme_memberships_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: false
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheme_memberships_molecule_id_fkey"
            columns: ["molecule_id"]
            isOneToOne: false
            referencedRelation: "molecules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheme_memberships_organism_id_fkey"
            columns: ["organism_id"]
            isOneToOne: false
            referencedRelation: "organisms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheme_memberships_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      schemes: {
        Row: {
          created_at: string
          created_by: string | null
          deity_name: string | null
          description: string | null
          dimension_scheme_id: string | null
          id: string
          metadata: Json | null
          name: string
          ontology_axis_scheme_id: string | null
          parent_scheme_id: string | null
          pk_pattern: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          rls_pattern: string | null
          scheme_type: string
          sort_order: number | null
          status: string
          submitted_by: string | null
          taxonomy_facet_scheme_id: string | null
          temperature: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deity_name?: string | null
          description?: string | null
          dimension_scheme_id?: string | null
          id?: string
          metadata?: Json | null
          name: string
          ontology_axis_scheme_id?: string | null
          parent_scheme_id?: string | null
          pk_pattern?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          rls_pattern?: string | null
          scheme_type: string
          sort_order?: number | null
          status?: string
          submitted_by?: string | null
          taxonomy_facet_scheme_id?: string | null
          temperature?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deity_name?: string | null
          description?: string | null
          dimension_scheme_id?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          ontology_axis_scheme_id?: string | null
          parent_scheme_id?: string | null
          pk_pattern?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          rls_pattern?: string | null
          scheme_type?: string
          sort_order?: number | null
          status?: string
          submitted_by?: string | null
          taxonomy_facet_scheme_id?: string | null
          temperature?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schemes_dimension_scheme_id_fkey"
            columns: ["dimension_scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schemes_ontology_axis_scheme_id_fkey"
            columns: ["ontology_axis_scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schemes_parent_scheme_id_fkey"
            columns: ["parent_scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schemes_taxonomy_facet_scheme_id_fkey"
            columns: ["taxonomy_facet_scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      scripts: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          file_path: string | null
          icon_emoji: string | null
          id: string
          input_requires: Json | null
          is_active: boolean
          name: string
          output_produces: Json | null
          script_type: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path?: string | null
          icon_emoji?: string | null
          id?: string
          input_requires?: Json | null
          is_active?: boolean
          name: string
          output_produces?: Json | null
          script_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path?: string | null
          icon_emoji?: string | null
          id?: string
          input_requires?: Json | null
          is_active?: boolean
          name?: string
          output_produces?: Json | null
          script_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      sensory_lexicon: {
        Row: {
          atom_id: string
          atom_word: string
          color_hex: string | null
          created_at: string
          emoji: string | null
          id: string
          movement: string | null
          shape: string | null
          smell: string | null
          sound_description: string | null
          sound_file_url: string | null
          sound_frequency: string | null
          sound_pitch: string | null
          sound_timbre: string | null
          sound_tone: string | null
          taste: string | null
          temperature: string | null
          texture: string | null
          updated_at: string
        }
        Insert: {
          atom_id: string
          atom_word: string
          color_hex?: string | null
          created_at?: string
          emoji?: string | null
          id?: string
          movement?: string | null
          shape?: string | null
          smell?: string | null
          sound_description?: string | null
          sound_file_url?: string | null
          sound_frequency?: string | null
          sound_pitch?: string | null
          sound_timbre?: string | null
          sound_tone?: string | null
          taste?: string | null
          temperature?: string | null
          texture?: string | null
          updated_at?: string
        }
        Update: {
          atom_id?: string
          atom_word?: string
          color_hex?: string | null
          created_at?: string
          emoji?: string | null
          id?: string
          movement?: string | null
          shape?: string | null
          smell?: string | null
          sound_description?: string | null
          sound_file_url?: string | null
          sound_frequency?: string | null
          sound_pitch?: string | null
          sound_timbre?: string | null
          sound_tone?: string | null
          taste?: string | null
          temperature?: string | null
          texture?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sensory_lexicon_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: true
            referencedRelation: "atom_whole"
            referencedColumns: ["atom_id"]
          },
          {
            foreignKeyName: "sensory_lexicon_atom_id_fkey"
            columns: ["atom_id"]
            isOneToOne: true
            referencedRelation: "atoms"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          default_columns: Json | null
          default_indexes: Json | null
          default_triggers: Json | null
          description: string | null
          has_display_name: boolean
          has_slug: boolean
          has_status: boolean
          has_visual_anchors: boolean
          icon_emoji: string | null
          id: string
          name: string
          pk_pattern: string | null
          rls_pattern: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          default_columns?: Json | null
          default_indexes?: Json | null
          default_triggers?: Json | null
          description?: string | null
          has_display_name?: boolean
          has_slug?: boolean
          has_status?: boolean
          has_visual_anchors?: boolean
          icon_emoji?: string | null
          id?: string
          name: string
          pk_pattern?: string | null
          rls_pattern?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          default_columns?: Json | null
          default_indexes?: Json | null
          default_triggers?: Json | null
          description?: string | null
          has_display_name?: boolean
          has_slug?: boolean
          has_status?: boolean
          has_visual_anchors?: boolean
          icon_emoji?: string | null
          id?: string
          name?: string
          pk_pattern?: string | null
          rls_pattern?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      thesaurus: {
        Row: {
          color_hex: string | null
          created_at: string
          created_by: string | null
          definition: string | null
          emoji: string
          folksonomy_type: string
          id: string
          notes: string | null
          sensory_color: string | null
          sensory_id: string | null
          sensory_sound: string | null
          sensory_temperature: string | null
          sensory_texture: string | null
          updated_at: string
          word: string
        }
        Insert: {
          color_hex?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          emoji: string
          folksonomy_type: string
          id?: string
          notes?: string | null
          sensory_color?: string | null
          sensory_id?: string | null
          sensory_sound?: string | null
          sensory_temperature?: string | null
          sensory_texture?: string | null
          updated_at?: string
          word: string
        }
        Update: {
          color_hex?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          emoji?: string
          folksonomy_type?: string
          id?: string
          notes?: string | null
          sensory_color?: string | null
          sensory_id?: string | null
          sensory_sound?: string | null
          sensory_temperature?: string | null
          sensory_texture?: string | null
          updated_at?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "thesaurus_folksonomy_type_fkey"
            columns: ["folksonomy_type"]
            isOneToOne: false
            referencedRelation: "folksonomies"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "thesaurus_sensory_id_fkey"
            columns: ["sensory_id"]
            isOneToOne: false
            referencedRelation: "sensory_lexicon"
            referencedColumns: ["id"]
          },
        ]
      }
      triggers: {
        Row: {
          archived_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          events: string | null
          function_name: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          log: Json
          name: string
          table_name: string
          timing: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          events?: string | null
          function_name?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          name: string
          table_name: string
          timing?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          events?: string | null
          function_name?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          name?: string
          table_name?: string
          timing?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      views: {
        Row: {
          archived_at: string | null
          created_at: string
          created_by: string | null
          definition: string | null
          description: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          log: Json
          name: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          name: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          log?: Json
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      atom_dressed: {
        Row: {
          atom_id: string | null
          atom_type: Database["public"]["Enums"]["atom_type"] | null
          atom_word: string | null
          category_face: string | null
          category_name: string | null
          color_hex: string | null
          definition: string | null
          emoji: string | null
          folksonomy_type: string | null
          is_override: boolean | null
          modifiers: Json | null
          pascal_case: string | null
          root_language: string | null
          root_word: string | null
          sanctuary_meaning: string | null
          screaming_case: string | null
          snake_case: string | null
        }
        Relationships: []
      }
      atom_whole: {
        Row: {
          affinity: number | null
          atom_id: string | null
          atom_type: Database["public"]["Enums"]["atom_type"] | null
          atom_word: string | null
          category_face: string | null
          category_id: string | null
          category_name: string | null
          definition: string | null
          etymology_progress: number | null
          has_color: boolean | null
          has_etymology: boolean | null
          has_face: boolean | null
          historical_meaning: string | null
          modifiers: Json | null
          molecule_count: number | null
          molecule_names: string[] | null
          pascal_case: string | null
          primary_scheme_names: string[] | null
          relation_types: string[] | null
          root_language: string | null
          root_word: string | null
          sanctuary_meaning: string | null
          scheme_names: string[] | null
          screaming_case: string | null
          sensory_color: string | null
          sensory_emoji: string | null
          sensory_movement: string | null
          sensory_shape: string | null
          sensory_smell: string | null
          sensory_sound: string | null
          sensory_taste: string | null
          sensory_temperature: string | null
          sensory_texture: string | null
          snake_case: string | null
          sound_frequency: string | null
          sound_pitch: string | null
          sound_timbre: string | null
          sound_tone: string | null
          state: Database["public"]["Enums"]["atom_state"] | null
          status: string | null
          thesaurus_entry_count: number | null
          thesaurus_folksonomies: string[] | null
          valence: number | null
          weight: number | null
        }
        Relationships: [
          {
            foreignKeyName: "atoms_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      awen_dressed: {
        Row: {
          definition: string | null
          face: string | null
          family: string | null
          home: string | null
          id: string | null
          name: string | null
          named_for: string | null
          named_for_colour: string | null
          named_for_face: string | null
          named_via: string | null
          own_face: string | null
          slug: string | null
          status: string | null
          story: string | null
          tool_type: Database["public"]["Enums"]["tool_type"] | null
          type_colour: string | null
          type_face: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tools_folksonomy_type_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "folksonomies"
            referencedColumns: ["name"]
          },
        ]
      }
      beacons_dressed: {
        Row: {
          available_on: string[] | null
          beacon_type: Database["public"]["Enums"]["beacon_type"] | null
          definition: string | null
          face: string | null
          family: string | null
          id: string | null
          is_public: boolean | null
          name: string | null
          named_for: string | null
          named_for_colour: string | null
          named_for_face: string | null
          named_via: string | null
          own_face: string | null
          repo_url: string | null
          slug: string | null
          status: string | null
          story: string | null
          type_colour: string | null
          type_face: string | null
          version: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      bond_tender: { Args: never; Returns: Json }
      gaia_generation_flags: { Args: { p_table_name: string }; Returns: Json }
      gaia_handling_level: { Args: { p_table_name: string }; Returns: string }
      gaia_sync: { Args: { p_table?: string }; Returns: Json }
      gaia_template_level: { Args: { p_table_name: string }; Returns: string }
    }
    Enums: {
      atom_role:
        | "core_type"
        | "modifier"
        | "prefix"
        | "suffix"
        | "joiner"
        | "action"
        | "tense"
      atom_state: "static" | "active" | "transitional"
      atom_type: "root" | "prefix" | "suffix" | "joiner" | "modifier" | "tense"
      beacon_type:
        | "game"
        | "app"
        | "library"
        | "system"
        | "instrument"
        | "archive"
        | "person"
        | "publication"
      bond_type: "covalent" | "ionic" | "metallic"
      functional_group:
        | "foreign_key"
        | "timestamp"
        | "primary_key"
        | "display_name"
        | "url_slug"
        | "status_field"
        | "owner_field"
        | "junction"
        | "config"
        | "audit"
      language:
        | "Latin"
        | "Greek"
        | "Old English"
        | "Norse"
        | "Proto-Germanic"
        | "Sanskrit"
        | "Arabic"
        | "French"
        | "German"
        | "unknown"
        | "Old French"
        | "Old English + Greek"
      molecule_domain:
        | "database"
        | "api"
        | "ui"
        | "knowledge"
        | "system"
        | "infrastructure"
      molecule_type:
        | "enum_name"
        | "enum_option"
        | "composite_type"
        | "composite_field"
        | "function_name"
        | "function_parameter"
        | "trigger_name"
        | "policy_name"
        | "index_name"
        | "column_name"
        | "table_name"
        | "object_name"
        | "field_name"
        | "atom_type_value"
        | "atom_state_value"
        | "concept"
        | "constant_name"
        | "component_name"
        | "class_name"
      naming_convention:
        | "snake_case"
        | "PascalCase"
        | "SCREAMING_CASE"
        | "camelCase"
        | "kebab-case"
      tool_type:
        | "capture"
        | "arrange"
        | "transform"
        | "refine"
        | "combine"
        | "emit"
        | "witness"
        | "translate"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      atom_role: [
        "core_type",
        "modifier",
        "prefix",
        "suffix",
        "joiner",
        "action",
        "tense",
      ],
      atom_state: ["static", "active", "transitional"],
      atom_type: ["root", "prefix", "suffix", "joiner", "modifier", "tense"],
      beacon_type: [
        "game",
        "app",
        "library",
        "system",
        "instrument",
        "archive",
        "person",
        "publication",
      ],
      bond_type: ["covalent", "ionic", "metallic"],
      functional_group: [
        "foreign_key",
        "timestamp",
        "primary_key",
        "display_name",
        "url_slug",
        "status_field",
        "owner_field",
        "junction",
        "config",
        "audit",
      ],
      language: [
        "Latin",
        "Greek",
        "Old English",
        "Norse",
        "Proto-Germanic",
        "Sanskrit",
        "Arabic",
        "French",
        "German",
        "unknown",
        "Old French",
        "Old English + Greek",
      ],
      molecule_domain: [
        "database",
        "api",
        "ui",
        "knowledge",
        "system",
        "infrastructure",
      ],
      molecule_type: [
        "enum_name",
        "enum_option",
        "composite_type",
        "composite_field",
        "function_name",
        "function_parameter",
        "trigger_name",
        "policy_name",
        "index_name",
        "column_name",
        "table_name",
        "object_name",
        "field_name",
        "atom_type_value",
        "atom_state_value",
        "concept",
        "constant_name",
        "component_name",
        "class_name",
      ],
      naming_convention: [
        "snake_case",
        "PascalCase",
        "SCREAMING_CASE",
        "camelCase",
        "kebab-case",
      ],
      tool_type: [
        "capture",
        "arrange",
        "transform",
        "refine",
        "combine",
        "emit",
        "witness",
        "translate",
      ],
    },
  },
} as const
