
export * from './deity_groups';
// dependency_map / efficiency_records are emitted by the dependency-analysis
// run (src/scripts/modules/analyze_dependencies.ts); they do not exist in
// this working tree — re-export them again when that run is part of the
// standard generation flow.
export * from './naming_guide';
export * from './object_categories';
export * from './generated/system_registry';

