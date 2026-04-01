# Summary Workflow
>->Types/Schema

# 1 Constants
>>->Constants
>    Why: These are the lowest-level dependencies.
>    What: Enums, configuration values, validation messages, or initial state objects derived from your schema.

# Utils
>>>->Utils
>    Why: These are pure functions that rely only on inputs (types/constants) and have no side effects.
>    -What: Data transformers, formatting functions, or validation logic.

# APIs (Service Layer)
>>>>->APIs
>    Why: These bring in the data, relying on your TypeScript definitions for input/output.
>    What: Axios/fetch calls, data fetching hooks (e.g., React Query or SWR), and validation integrations.

# Hooks
>>>>>->Hooks
>    Why: Hooks combine APIs (data) with Utils (logic) and manage state.
>    What: Complex custom hooks for managing component logic, form state, or data caching.

# Components
>>>>>>->Components
>    Why: Components are the presentation layer that consume hooks, constants, and utils to display data.
>    What: UI components (atoms, molecules, pages). 


