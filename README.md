# To-Do List App

A simple, fully featured To-Do List application built with React. This app allows you to add, edit, delete, and filter tasks, with persistent storage using localStorage and the ability to import/export tasks as JSON files. It’s styled with custom BearSansUI fonts and a dark blue accent color scheme.

## Features

- **Add Tasks:** Enter a new task and press Enter or click the "Add Task" button.
- **Edit Tasks:** Update task details in-place.
- **Delete Tasks:** Remove tasks from the list.
- **Mark as Completed:** Click on a task to toggle its completion status.
- **Filter Tasks:** View tasks by All, Active, or Completed.
- **Persistent Storage:** Tasks are saved in localStorage so they persist on reload.
- **Import/Export:** Export your tasks as a JSON file or import tasks from a JSON file.
- **Custom Styling:** Uses custom BearSansUI fonts for a unique look.

## Live Demo

Check out the live demo at: [todo.nathancourtney.com](https://todo.nathancourtney.com)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo-name
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   Your app will run at [http://localhost:3000](http://localhost:3000).

## Build

To create a production build, run:

```bash
npm run build
```

This command creates a `build` directory with the production-ready version of your app.

## Deployment

This app is deployed on [Cloudflare Pages](https://pages.cloudflare.com/). To deploy:

1. Push your code to GitHub.
2. Connect your repository to Cloudflare Pages.
3. Set the build command to `npm run build` and the output directory to `build`.

## Custom Fonts

All custom BearSansUI fonts are stored in the `public/fonts` directory. These fonts are referenced in the CSS via `@font-face` rules. Make sure these files remain in the `public/fonts` folder for proper styling.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, please contact Nathan Courtney.
