// @/config/enum-mapping.ts
// ENUM TO DEITY FOLDER MAPPING
// Maps each runtime enum to its designated deity folder
// Generated: April 5, 2026

export const ENUM_FOLDER_MAPPING: Record<string, string> = {
  // =====================================================
  // hestia-core (Core Identity)
  // =====================================================
  "user_tier": "hestia-core",
  "user_status": "hestia-core",
  "council_house": "hestia-core",
  "communication_style": "hestia-core",
  "verification_status": "hestia-core",
  "contact_direction": "hestia-core",
  "contact_status": "hestia-core",
  "setting_scope": "hestia-core",
  "date_format_type": "hestia-core",
  "time_format_type": "hestia-core",
  "text_direction_type": "hestia-core",
  "measurement_system_type": "hestia-core",
  "currency_position_type": "hestia-core",

  // =====================================================
  // plutus-ecONOMICS (Economic Engine)
  // =====================================================
  "product_type": "plutus-economics",
  "payment_status": "plutus-economics",
  "payout_status": "plutus-economics",
  "payout_frequency": "plutus-economics",
  "payout_method": "plutus-economics",
  "subscription_status": "plutus-economics",
  "transaction_type": "plutus-economics",
  "ledger_entity": "plutus-economics",
  "ledger_entry_type": "plutus-economics",
  "source_pool_type": "plutus-economics",
  "recurring_interval": "plutus-economics",
  "bid_type": "plutus-economics",
  "stripe_mode": "plutus-economics",
  "owner_type": "plutus-economics",
  "contribution_type": "plutus-economics",
  "submission_type": "plutus-economics",

  // =====================================================
  // hermes-social (Social Engagement)
  // =====================================================
  "post_visibility": "hermes-social",
  "content_type": "hermes-social",
  "content_rating": "hermes-social",
  "reaction_type": "hermes-social",
  "notification_type": "hermes-social",
  "emerald_status": "hermes-social",
  "message_status": "hermes-social",
  "activity_visibility": "hermes-social",
  "report_target_type": "hermes-social",

  // =====================================================
  // athena-gAMIFICATION (Gamification)
  // =====================================================
  "quest_status": "athena-gamification",
  "badge_type": "athena-gamification",
  "badge_tier": "athena-gamification",
  "badge_rarity": "athena-gamification",
  "progress_status": "athena-gamification",
  "difficulty_level": "athena-gamification",
  "life_cycle_phase": "athena-gamification",
  "timeline_event_type": "athena-gamification",
  "scene_type": "athena-gamification",
  "myth_type": "athena-gamification",

  // =====================================================
  // mnemosyne-assessment (Assessment)
  // =====================================================
  "acid_persona": "mnemosyne-assessment",
  "acid_question_type": "mnemosyne-assessment",
  "taxonomy_node_type": "mnemosyne-assessment",
  "ontology_predicate": "mnemosyne-assessment",
  "folksonomy_target_type": "mnemosyne-assessment",
  "superposition_status": "mnemosyne-assessment",
  "translatable_type": "mnemosyne-assessment",

  // =====================================================
  // themis-governance (Governance)
  // =====================================================
  "admin_log_category": "themis-governance",
  "admin_log_target_type": "themis-governance",
  "application_status": "themis-governance",
  "application_type": "themis-governance",
  "moderation_action_type": "themis-governance",
  "moderation_target_type": "themis-governance",
  "process_type": "themis-governance",
  "report_type": "themis-governance",
  "report_status": "themis-governance",

  // =====================================================
  // Iris-comMUNICATIONS (Communications)
  // =====================================================
  "custom_category_type": "Iris-communications",
  "survey_audience_type": "Iris-communications",

  // =====================================================
  // hephaestus-infrastructure (Infrastructure)
  // =====================================================
  "action_type": "hephaestus-infrastructure",
  "target_type": "hephaestus-infrastructure",
  "job_status": "hephaestus-infrastructure",
  "job_type": "hephaestus-infrastructure",
  "maintenance_status": "hephaestus-infrastructure",
  "maintenance_type": "hephaestus-infrastructure",
  "deployment_status": "hephaestus-infrastructure",
  "delivery_status": "hephaestus-infrastructure",
  "system_status": "hephaestus-infrastructure",
  "system_type": "hephaestus-infrastructure",
  "platform_status": "hephaestus-infrastructure",
  "platform_environment": "hephaestus-infrastructure",
  "webhook_status": "hephaestus-infrastructure",
  "workflow_status": "hephaestus-infrastructure",
  "calendar_event_type": "hephaestus-infrastructure",
  "calendar_visibility": "hephaestus-infrastructure",
  "campaign_status": "hephaestus-infrastructure",
  "script_type": "hephaestus-infrastructure",

  // =====================================================
  // aethelred-connections (Connections)
  // =====================================================
  "bridge_status": "aethelred-connections",
  "supabase_status": "aethelred-connections",


  // =====================================================
  // DEFAULT FALLBACK
  // =====================================================
  "default": "hestia-core"
};

export function getEnumFolder(enumName: string): string {
  return ENUM_FOLDER_MAPPING[enumName] || ENUM_FOLDER_MAPPING.default;
}

export function getAllEnumFolders(): string[] {
  const folders = new Set<string>();
  for (const folder of Object.values(ENUM_FOLDER_MAPPING)) {
    folders.add(folder);
  }
  return Array.from(folders);
}

export function getEnumsByFolder(folderName: string): string[] {
  return Object.entries(ENUM_FOLDER_MAPPING)
    .filter(([_, folder]) => folder === folderName)
    .map(([enumName]) => enumName);
}