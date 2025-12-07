# Project Guidelines

## 1. Component Structure & Size
- **JSX components must be under 200 lines.**
  - If a component grows beyond 200 lines, split it into smaller, reusable components.
  - Example: Move form sections, table rows, or modal content into their own files.

## 2. Styling
- **Tailwind CSS is prioritized for all styling.**
  - Use Tailwind utility classes for layout, spacing, colors, and responsiveness.
    ```jsx
    <button className="bg-primary-blue text-white px-4 py-2 rounded">
    Submit
    </button>
    ```
- **If a CSS variable is needed and not supported directly by Tailwind, use bracket notation.**
  - Example:  
    ```jsx
    <div className="bg-[var(--primary-blue)] text-[var(--primary-black)]" />
    ```
    
**Example of using a CSS variable with Tailwind:**

- **Do not use inline styles unless absolutely necessary.**
- **Do not use external CSS files for component-specific styles.**  
  Use Tailwind or global variables instead.

## 3. CSS Variables & App.css
- **All root CSS variables must be defined in `App.css`.**
  - Example:
    ```css
    :root {
      --primary-blue: #2563eb;
      --primary-black: #22223b;
      --background: #f8fafc;
      --light-grey: #e5e7eb;
      /* Add more as needed */
    }
    ```
- **Do not redefine root variables in component files.**

## 4. File & Folder Structure
- **Organize components by feature or domain.**
- **Use PascalCase for component filenames and camelCase for variables and functions.**
- **Keep utility/helper functions in a separate `utils` or `helpers` folder.**

## 5. Code Quality
- **Use meaningful variable and function names.**
- **Remove unused imports and variables.**
- **Write concise and clear code.**
- **Add comments for complex logic or non-obvious code.**

## 6. Accessibility
- **Use semantic HTML elements where possible.**
- **Add `aria-label` or `alt` attributes for icons and images.**
- **Ensure all interactive elements are keyboard accessible.**

## 7. State Management
- **Use React hooks (`useState`, `useEffect`, etc.) for local state.**
- **Lift state up only when necessary.**
- **Avoid prop drilling by using context or splitting components.**

## 8. Data & Props
- **Validate and sanitize all data passed as props.**
- **Use PropTypes or TypeScript for type safety if possible.**

## 9. Reusability
- **Write generic and reusable components.**
- **Try Avoid duplicating code as much as possible; extract shared logic into hooks or utilities. (Follow DRY rule)**

## 10. Performance
- **Use `useMemo` and `useCallback` for expensive computations or functions passed as props.**
- **Paginate large data sets in tables and lists.**

## 11. Loading and Code Splitting

- **We use React's `Suspense` component to display a loading indicator while components are being loaded.**
  - This helps improve user experience and performance, especially when splitting the app into multiple portals (e.g., Super Admin, Restaurant Admin, Employee View).

  - Example:
     _this is just a sample code snippet, you should adapt it to your needs._
    ```jsx
    import { Suspense, lazy } from "react";
    
    //in jsx
    <Suspense fallback={<Loading />}>
      <SomeComponent />
    </Suspense>
    ```
    ```
    Here, <Loading /> component is self defined in the directory
    ```



# Custom Components Guidelines

## 1. Custom Table Component

**Use the custom `Table` component for all tabular data displays.**
- **Sticky First Column:**  
  When you pass `type="special"` to the `Table` component, the first column will automatically become sticky on the left side when you scroll horizontally. This is useful for tables with many columns where you want to keep the first column visible.

  If you do not need this feature, you can simply omit the `type` prop or set it to `"normal"`.
  - Example:
    ```jsx
    <Table
      HeadingData={HeadingData}
      bodyData={data}
      actionData={actionData}
      type="special"
    />
    ```
- **Providing Data:**  
  Sequence is important when passing data to the `Table` component. Ensure that the order of Heading and Body of your data matches the order of headings in `HeadingData`.
  - **HeadingData:** Pass an object with a `th` array, where each item has a `title` property for the column header.
    ```javascript
    const HeadingData = {
      th: [
        { title: "ID" },
        { title: "Name" },
        { title: "Email" },
        // ...
      ]
    };
    ```
  - **Data:** Pass an array of objects, where each object represents a row and the keys match the order of your headings.
    ```javascript
    const data = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      // ...
    ];
    ```
- **ActionData:**  
  - The `actionData` prop is an array of functions or React elements that render icons (such as edit, delete, view, etc.) in the action column for each row.

  - Each function receives an object with `row` and `rowIndex` and should return a React element (icon/button).

  - Pass the Icons in a function that receives the `rowIndex` to ensure each icon is unique and can handle events like clicks.

  - **Example:**
    ```javascript
    import { Pencil, Trash2 } from "lucide-react";

    const actionData = [
      ({ rowIndex }) => (
        <Pencil
          key={`edit-${rowIndex}`}
          size={16}
          color="#559955"
          style={{ cursor: "pointer" }}
          onClick={() => handleEdit(rowIndex)}
        />
      ),
      ({ rowIndex }) => (
        <Trash2
          key={`delete-${rowIndex}`}
          size={16}
          color="#ff0022"
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(rowIndex)}
        />
      ),
    ];
    ```

---