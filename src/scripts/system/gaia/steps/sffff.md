interface GaiaOptions

interface TableInfo

interface TableDependencies




function toPascalCase(str: string): string

function askUser(question: string): Promise<string>

async function getInteractiveOptions(): Promise<GaiaOptions> 

function parseOptions(): GaiaOptions

function filterTableNames(options: GaiaOptions): string[] 

function extractRuntimeEnums(lines: string[], markers: any): Map<string, string[]>

async function processTable

async function generateArtifactsForTable

function generateValidatorContent(tableInfo: TableInfo): string

function buildZodFields(rowContent: string, enumRefs: string[]): string

function generateRowFields(rowContent: string): string

function generateInsertFields(rowContent: string): string

function generateUpdateFields(rowContent: string): string

function generateMainApiRoute(tableInfo: TableInfo): string
function generateSingleApiRoute(tableInfo: TableInfo): string

function generateUtilsContent(tableInfo: TableInfo): string

function generateHooksContent(tableInfo: TableInfo): string

async function showGenerationPlan

async function runGaia(options: GaiaOptions)

async function main()