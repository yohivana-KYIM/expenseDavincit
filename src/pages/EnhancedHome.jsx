import React from 'react';
import Home from './Home';
import ExpenseTrackerAnimation from '../components/ExpenseTrackerAnimation';

function EnhancedHome() {
  return (
    <div>
            <Home />
      <ExpenseTrackerAnimation />
  
    </div>
  );
}

export default EnhancedHome;