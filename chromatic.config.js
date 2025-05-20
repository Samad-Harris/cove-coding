module.exports = {
  // Your Chromatic project token (you'll get this when you set up chromatic)
  projectToken: 'your-project-token',
  
  // Optional: Specify the path to your built Storybook directory
  storybookBuildDir: 'storybook-static',
  
  // Optional: Specify the base branch for comparison
  // This defaults to 'main'
  baseBranch: 'main',
  
  // Optional: Only important Storybook stories rather than all of them
  onlyChanged: true,
  
  // Optional: Skip stories that match this pattern
  skip: ['**/stories/**/example/**'],
  
  // Optional: Don't bail on failure
  exitZeroOnChanges: true,
  
  // Optional: Don't run Chromatic on certain branches
  // For example, only run on main and PRs into main
  autoAcceptChanges: (branch) => branch === 'main',
};
