1. Setting up ESlint, prettier, gitignore
2. do not eject from CRA
3. always use destructuring
4. Focus on creating functional component and useEffect hooks, do not use class based components
5. Think about rerendering and use `useEffect` to reduce unnecessary re-rendering.
5. Maintain as many stateless component as much as possible, but do not fall into props chaining hell
6. Preference of `async`/`await` over `.then` and `.catch`
7. Root Path should fall in a PATH constants file 
8. Store Persistent state and Client State(authenticated state etc.) in redux., Local UI state to pass down through component props. Do not abuse redux, if we're handling user input, `onChangeHandler` should use local state.

#Things to do
- guard the route(if user access through URL instead of normal button clicks)
- refresh token on each HTTP request, using refresh token
- load the token from localstorage if available
