# React + Vite

This is setup template that allows you to start project faster. 

- Empty App.jsx
- App.css reset
- Custom sass properties & utilities
- .gitignore **.css.map
- React-Router-Dom

# Change Project Name

- Change name in package.json and package-lock.json
<!--CMD + F and "vite-project" replace everything with "new-project-name" -->

# Reset GIT
(https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)

https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github

- git remote add origin <NEW_REMOTE_URL>
<!-- set a new remote file -->

- git remote -v
<!-- Verify new remote -->
> should show 👉 origin <NEW_REMOTE_URL> (fetch)
> should show 👉 <NEW_REMOTE_URL> (push)

# Delete GIT

- rm -r .git .gitignore (chmod -R +w . might be necessary)
<!-- Must be in the directory -->
