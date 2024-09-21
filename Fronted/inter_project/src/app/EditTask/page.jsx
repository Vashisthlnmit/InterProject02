'use client'
import AddTaskForm from '@/usercomponent/EditTask';
import React, { Suspense } from 'react';
// Import your AddTaskForm component

export default function EditTaskPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddTaskForm/>
    </Suspense>
  );
}
