module.exports = ({ config }) => {
  console.log(config.name); // prints 'My App'
  return {
    ...config,
    extra: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
  };
};
