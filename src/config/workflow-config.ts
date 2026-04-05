// src/config/workflow-config.ts

export type WorkflowType = 
  | 'full_crud'      // profiles, products, posts, channels
  | 'assessment'     // acid_test_questions, acid_test_answers
  | 'join_table'     // user_quests, user_badges, contributions
  | 'read_only'      // views, personalized_feed
  | 'function'       // database functions
  | 'type_enum'      // type-only enum (Database.public.Enums)
  | 'runtime_enum';  // runtime enum with constant object (Constants.public.Enums)

export interface WorkflowConfig {
  workflow: WorkflowType;
  generatePublicInterface: boolean;
  generateFormInterface: boolean;
  generateValidationInterface: boolean;
  generateConstants: boolean;
  defaultFolder?: string;        // For runtime enums without deity mapping
}

export const WORKFLOW_CONFIG: Record<string, WorkflowConfig> = {
  // Full CRUD tables
  profiles: { workflow: 'full_crud', generatePublicInterface: true, generateFormInterface: true, generateValidationInterface: true, generateConstants: false },
  products: { workflow: 'full_crud', generatePublicInterface: true, generateFormInterface: true, generateValidationInterface: true, generateConstants: false },
  posts: { workflow: 'full_crud', generatePublicInterface: true, generateFormInterface: true, generateValidationInterface: true, generateConstants: false },
  channels: { workflow: 'full_crud', generatePublicInterface: true, generateFormInterface: true, generateValidationInterface: true, generateConstants: false },
  
  // Assessment tables (simpler)
  acid_test_questions: { workflow: 'assessment', generatePublicInterface: false, generateFormInterface: true, generateValidationInterface: false, generateConstants: false },
  acid_test_answers: { workflow: 'assessment', generatePublicInterface: false, generateFormInterface: true, generateValidationInterface: false, generateConstants: false },
  
  // Join tables
  user_quests: { workflow: 'join_table', generatePublicInterface: false, generateFormInterface: true, generateValidationInterface: false, generateConstants: false },
  user_badges: { workflow: 'join_table', generatePublicInterface: false, generateFormInterface: true, generateValidationInterface: false, generateConstants: false },
  contributions: { workflow: 'join_table', generatePublicInterface: false, generateFormInterface: true, generateValidationInterface: false, generateConstants: false },
  
  // Runtime Enums - default to hestia_core if no deity mapping found
  runtime_enum: { workflow: 'runtime_enum', generatePublicInterface: false, generateFormInterface: false, generateValidationInterface: false, generateConstants: true, defaultFolder: 'hestia_core' },
  
  // Type Enums - no file generation needed
  type_enum: { workflow: 'type_enum', generatePublicInterface: false, generateFormInterface: false, generateValidationInterface: false, generateConstants: false },
  
  // Default for unknown tables
  default: { workflow: 'full_crud', generatePublicInterface: true, generateFormInterface: true, generateValidationInterface: true, generateConstants: false },
};

export function getWorkflowConfig(tableName: string): WorkflowConfig {
  return WORKFLOW_CONFIG[tableName] || WORKFLOW_CONFIG.default;
}

export function getRuntimeEnumConfig(): WorkflowConfig {
  return WORKFLOW_CONFIG.runtime_enum;
}