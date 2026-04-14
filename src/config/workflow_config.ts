// @/config/workflow-config.ts

export type WorkflowType = 
  | 'full_crud'
  | 'assessment'
  | 'join_table'
  | 'read_only'
  | 'function'
  | 'type_enum'
  | 'runtime_enum';

export interface WorkflowConfig {
  workflow: WorkflowType;
  
  // Type file generation flags
  generateRow: boolean;
  generateInsert: boolean;
  generateUpdate: boolean;
  generatePublicInterface: boolean;
  generateFormInterface: boolean;
  generateValidationInterface: boolean;
  
  // Constant file generation flags
  generateConstants: boolean;
  
  // Validator generation flags
  generateValidator: boolean;
  
  // API generation flags
  generateApiGetList: boolean;
  generateApiGetSingle: boolean;
  generateApiPost: boolean;
  generateApiPut: boolean;
  generateApiDelete: boolean;
  generateApiSpecial: string[];
  
  // Staging and routing
  defaultFolder?: string;
  stagingBase?: string;
  apiBasePath?: string;
}

// Complete configurations by workflow type (no partials)
const FULL_CRUD_CONFIG: WorkflowConfig = {
  workflow: 'full_crud',
  generateRow: true,
  generateInsert: true,
  generateUpdate: true,
  generatePublicInterface: true,
  generateFormInterface: true,
  generateValidationInterface: true,
  generateConstants: false,
  generateValidator: true,
  generateApiGetList: true,
  generateApiGetSingle: true,
  generateApiPost: true,
  generateApiPut: true,
  generateApiDelete: true,
  generateApiSpecial: []
};

const ASSESSMENT_CONFIG: WorkflowConfig = {
  workflow: 'assessment',
  generateRow: true,
  generateInsert: true,
  generateUpdate: true,
  generatePublicInterface: false,
  generateFormInterface: true,
  generateValidationInterface: false,
  generateConstants: false,
  generateValidator: true,
  generateApiGetList: true,
  generateApiGetSingle: true,
  generateApiPost: true,
  generateApiPut: false,
  generateApiDelete: false,
  generateApiSpecial: ['submit', 'results']
};

const JOIN_TABLE_CONFIG: WorkflowConfig = {
  workflow: 'join_table',
  generateRow: true,
  generateInsert: true,
  generateUpdate: true,
  generatePublicInterface: false,
  generateFormInterface: true,
  generateValidationInterface: false,
  generateConstants: false,
  generateValidator: true,
  generateApiGetList: true,
  generateApiGetSingle: true,
  generateApiPost: true,
  generateApiPut: false,
  generateApiDelete: true,
  generateApiSpecial: ['link', 'unlink']
};

const READ_ONLY_CONFIG: WorkflowConfig = {
  workflow: 'read_only',
  generateRow: true,
  generateInsert: false,
  generateUpdate: false,
  generatePublicInterface: true,
  generateFormInterface: false,
  generateValidationInterface: false,
  generateConstants: false,
  generateValidator: false,
  generateApiGetList: true,
  generateApiGetSingle: true,
  generateApiPost: false,
  generateApiPut: false,
  generateApiDelete: false,
  generateApiSpecial: []
};

const FUNCTION_CONFIG: WorkflowConfig = {
  workflow: 'function',
  generateRow: false,
  generateInsert: false,
  generateUpdate: false,
  generatePublicInterface: false,
  generateFormInterface: false,
  generateValidationInterface: false,
  generateConstants: false,
  generateValidator: false,
  generateApiGetList: false,
  generateApiGetSingle: false,
  generateApiPost: true,
  generateApiPut: false,
  generateApiDelete: false,
  generateApiSpecial: ['invoke'],
  defaultFolder: 'hestia-core'
};

const TYPE_ENUM_CONFIG: WorkflowConfig = {
  workflow: 'type_enum',
  generateRow: false,
  generateInsert: false,
  generateUpdate: false,
  generatePublicInterface: false,
  generateFormInterface: false,
  generateValidationInterface: false,
  generateConstants: false,
  generateValidator: false,
  generateApiGetList: false,
  generateApiGetSingle: false,
  generateApiPost: false,
  generateApiPut: false,
  generateApiDelete: false,
  generateApiSpecial: [],
  defaultFolder: 'hestia-core'
};

const RUNTIME_ENUM_CONFIG: WorkflowConfig = {
  workflow: 'runtime_enum',
  generateRow: false,
  generateInsert: false,
  generateUpdate: false,
  generatePublicInterface: false,
  generateFormInterface: false,
  generateValidationInterface: false,
  generateConstants: true,
  generateValidator: false,
  generateApiGetList: false,
  generateApiGetSingle: false,
  generateApiPost: false,
  generateApiPut: false,
  generateApiDelete: false,
  generateApiSpecial: [],
  defaultFolder: 'hestia-core'
};

// Table-specific configurations
export const WORKFLOW_CONFIG: Record<string, WorkflowConfig> = {
  // Full CRUD tables
  profiles: FULL_CRUD_CONFIG,
  products: FULL_CRUD_CONFIG,
  posts: FULL_CRUD_CONFIG,
  channels: FULL_CRUD_CONFIG,
  comments: FULL_CRUD_CONFIG,
  subscriptions: FULL_CRUD_CONFIG,
  notifications: FULL_CRUD_CONFIG,
  messages: FULL_CRUD_CONFIG,
  
  // Assessment tables
  acid_test_questions: ASSESSMENT_CONFIG,
  acid_test_answers: ASSESSMENT_CONFIG,
  acid_test_results: ASSESSMENT_CONFIG,
  
  // Join tables
  user_quests: JOIN_TABLE_CONFIG,
  user_badges: JOIN_TABLE_CONFIG,
  contributions: JOIN_TABLE_CONFIG,
  creator_profiles: JOIN_TABLE_CONFIG,
  vendor_profiles: JOIN_TABLE_CONFIG,
  community_profiles: JOIN_TABLE_CONFIG,
  
  // Read-only views
  personalized_feed: READ_ONLY_CONFIG,
  public_transparency: READ_ONLY_CONFIG,
  my_residuals: READ_ONLY_CONFIG,
  
  // Runtime Enums
  runtime_enum: RUNTIME_ENUM_CONFIG,
  
  // Type Enums
  type_enum: TYPE_ENUM_CONFIG,
  
  // Default for unknown tables
  default: FULL_CRUD_CONFIG,
};

// Helper functions
export function getWorkflowConfig(tableName: string): WorkflowConfig {
  return WORKFLOW_CONFIG[tableName] || WORKFLOW_CONFIG.default;
}

export function getRuntimeEnumConfig(): WorkflowConfig {
  return WORKFLOW_CONFIG.runtime_enum;
}

export function getTypeEnumConfig(): WorkflowConfig {
  return WORKFLOW_CONFIG.type_enum;
}

export function getTablesByWorkflow(workflow: WorkflowType): string[] {
  return Object.entries(WORKFLOW_CONFIG)
    .filter(([_, config]) => config.workflow === workflow)
    .map(([tableName]) => tableName);
}

export function needsTypeGeneration(tableName: string): boolean {
  const config = getWorkflowConfig(tableName);
  return config.generateRow || config.generateInsert || config.generateUpdate;
}

export function needsValidatorGeneration(tableName: string): boolean {
  return getWorkflowConfig(tableName).generateValidator;
}

export function needsApiGeneration(tableName: string): boolean {
  const config = getWorkflowConfig(tableName);
  return config.generateApiGetList || config.generateApiGetSingle || 
         config.generateApiPost || config.generateApiPut || config.generateApiDelete;
}