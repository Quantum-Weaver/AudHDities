// src/config/enum-mapping.ts
// ENUM TO DEITY FOLDER MAPPING
// Maps each runtime enum to its designated deity folder
// Generated: April 5, 2026

export const ENUM_FOLDER_MAPPING: Record<string, string> = {
  // =====================================================
  // HESTIA_CORE (Core Identity)
  // =====================================================
  "user_tier": "hestia_core",
  "user_status": "hestia_core",
  "council_house": "hestia_core",
  "communication_style": "hestia_core",
  "verification_status": "hestia_core",
  "contact_direction": "hestia_core",
  "contact_status": "hestia_core",
  "setting_scope": "hestia_core",
  "date_format_type": "hestia_core",
  "time_format_type": "hestia_core",
  "text_direction_type": "hestia_core",
  "measurement_system_type": "hestia_core",
  "currency_position_type": "hestia_core",

  // =====================================================
  // PLUTUS_ECONOMICS (Economic Engine)
  // =====================================================
  "product_type": "plutus_economics",
  "payment_status": "plutus_economics",
  "payout_status": "plutus_economics",
  "payout_frequency": "plutus_economics",
  "payout_method": "plutus_economics",
  "subscription_status": "plutus_economics",
  "transaction_type": "plutus_economics",
  "ledger_entity": "plutus_economics",
  "ledger_entry_type": "plutus_economics",
  "source_pool_type": "plutus_economics",
  "recurring_interval": "plutus_economics",
  "bid_type": "plutus_economics",
  "stripe_mode": "plutus_economics",
  "owner_type": "plutus_economics",
  "contribution_type": "plutus_economics",
  "submission_type": "plutus_economics",

  // =====================================================
  // HERMES_SOCIAL (Social Engagement)
  // =====================================================
  "post_visibility": "hermes_social",
  "content_type": "hermes_social",
  "content_rating": "hermes_social",
  "reaction_type": "hermes_social",
  "notification_type": "hermes_social",
  "emerald_status": "hermes_social",
  "message_status": "hermes_social",
  "activity_visibility": "hermes_social",
  "report_target_type": "hermes_social",

  // =====================================================
  // ATHENA_GAMIFICATION (Gamification)
  // =====================================================
  "quest_status": "athena_gamification",
  "badge_type": "athena_gamification",
  "badge_tier": "athena_gamification",
  "badge_rarity": "athena_gamification",
  "progress_status": "athena_gamification",
  "difficulty_level": "athena_gamification",
  "life_cycle_phase": "athena_gamification",
  "timeline_event_type": "athena_gamification",
  "scene_type": "athena_gamification",
  "myth_type": "athena_gamification",

  // =====================================================
  // MNEMOSYNE_ASSESSMENT (Assessment)
  // =====================================================
  "acid_persona": "mnemosyne_assessment",
  "acid_question_type": "mnemosyne_assessment",
  "taxonomy_node_type": "mnemosyne_assessment",
  "ontology_predicate": "mnemosyne_assessment",
  "folksonomy_target_type": "mnemosyne_assessment",
  "superposition_status": "mnemosyne_assessment",
  "translatable_type": "mnemosyne_assessment",

  // =====================================================
  // THEMIS_GOVERNANCE (Governance)
  // =====================================================
  "admin_log_category": "themis_governance",
  "admin_log_target_type": "themis_governance",
  "application_status": "themis_governance",
  "application_type": "themis_governance",
  "moderation_action_type": "themis_governance",
  "moderation_target_type": "themis_governance",
  "process_type": "themis_governance",
  "report_type": "themis_governance",
  "report_status": "themis_governance",

  // =====================================================
  // IRIS_COMMUNICATIONS (Communications)
  // =====================================================
  "custom_category_type": "iris_communications",
  "survey_audience_type": "iris_communications",

  // =====================================================
  // HEPHAESTUS_INFRASTRUCTURE (Infrastructure)
  // =====================================================
  "action_type": "hephaestus_infrastructure",
  "target_type": "hephaestus_infrastructure",
  "job_status": "hephaestus_infrastructure",
  "job_type": "hephaestus_infrastructure",
  "maintenance_status": "hephaestus_infrastructure",
  "maintenance_type": "hephaestus_infrastructure",
  "deployment_status": "hephaestus_infrastructure",
  "delivery_status": "hephaestus_infrastructure",
  "system_status": "hephaestus_infrastructure",
  "system_type": "hephaestus_infrastructure",
  "platform_status": "hephaestus_infrastructure",
  "platform_environment": "hephaestus_infrastructure",
  "webhook_status": "hephaestus_infrastructure",
  "workflow_status": "hephaestus_infrastructure",
  "calendar_event_type": "hephaestus_infrastructure",
  "calendar_visibility": "hephaestus_infrastructure",
  "campaign_status": "hephaestus_infrastructure",
  "script_type": "hephaestus_infrastructure",

  // =====================================================
  // AETHELRED_CONNECTIONS (Connections)
  // =====================================================
  "bridge_status": "aethelred_connections",
  "supabase_status": "aethelred_connections",


  // =====================================================
  // DEFAULT FALLBACK
  // =====================================================
  "default": "hestia_core"
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