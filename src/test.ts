import { createUser, getUser, updateUserAge, deleteUser } from './userDBOperations';

(async () => {
  try {
    // Test createUser
    await createUser('ce-user-123', 'Rajiv Prakash', 29);
    console.log('User created.');

    // Test getUser
    const user = await getUser('ce-user-123');
    console.log('User retrieved:', user);

    // Test updateUserAge
    await updateUserAge('ce-user-123', 30);
    console.log('User age updated.');

    // Test deleteUser
    await deleteUser('ce-user-123');
    console.log('User deleted.');
  } catch (error) {
    console.error('Test error:', error);
  }
})();
