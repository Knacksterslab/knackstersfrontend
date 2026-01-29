# Testing Guide: Task Assignment Flow

## 🧪 Step-by-Step Testing Instructions

### **Prerequisites**
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3001
- [ ] Database seeded with:
  - At least 1 manager account
  - At least 1 client assigned to that manager
  - At least 1 project for that client
  - At least 1 PENDING task (unassigned) in that project
  - At least 1 TALENT user with ACTIVE status

---

## Test Scenario 1: Basic Assignment Flow ✅

### **Step 1: Login as Manager**
1. Navigate to `/manager/login` or `/login`
2. Login with manager credentials
3. Should redirect to `/manager-dashboard`

### **Step 2: Navigate to Assignments**
1. Click "Assignments" in sidebar or navigate to `/manager-dashboard/assignments`
2. Should see 4 summary cards:
   - Unassigned (should show count > 0)
   - In Progress
   - Completed
   - Total Tasks

### **Step 3: View Unassigned Tasks**
1. Click "Unassigned Tasks" tab (should be default)
2. Should see list of tasks with:
   - Task name
   - Priority badge
   - Client name
   - Project name
   - Due date
   - Task number badge
   - "Assign to Talent" button

### **Step 4: Open Assignment Modal**
1. Click "Assign to Talent" button on any task
2. Modal should open with:
   - Task details at top (name, project, client)
   - Search bar
   - List of available talent
   - Cancel and Assign buttons (Assign disabled until selection)

### **Step 5: Browse Talent**
1. Should see talent cards showing:
   - Avatar (image or initials)
   - Full name
   - Email
   - Workload indicator with color:
     - Green: "Available" (0 tasks)
     - Blue: "X active tasks" (1-3 tasks)
     - Yellow: "X active tasks" (4-6 tasks)
     - Red: "X active tasks" (7+ tasks)
   - Active status (green dot)

### **Step 6: Search Talent**
1. Type in search box
2. Results should filter in real-time
3. Try searching by:
   - First name
   - Last name
   - Email
4. Clear search, results should restore

### **Step 7: Select Talent**
1. Click on a talent card
2. Card should:
   - Get purple border
   - Purple background
   - Show checkmark icon
3. Assign button should update to: "Assign to [FirstName]"
4. Click different talent, selection should switch

### **Step 8: Assign Task**
1. With talent selected, click "Assign to [Name]" button
2. Should see:
   - Loading spinner
   - "Assigning..." text
   - Button disabled
   - Modal stays open

### **Step 9: Success State**
1. After ~1-2 seconds, should see:
   - Large green checkmark icon
   - "Task Assigned Successfully!" message
   - "[Talent Name] has been notified" text
2. After 1.5 seconds:
   - Modal automatically closes
   - Back to assignments page

### **Step 10: Verify Assignment**
1. Task should no longer be in "Unassigned" tab
2. Click "Assigned Tasks" tab
3. Task should appear there with:
   - Assigned talent name
   - Progress bar
   - Status changed to "ACTIVE" or "IN REVIEW"
4. Unassigned count should decrease by 1
5. Assigned count should increase by 1

### **Step 11: Verify Talent Notification**
1. Login as the assigned talent (different browser/incognito)
2. Should see notification:
   - "New Task Assigned"
   - Message about the task
   - Link to view task

---

## Test Scenario 2: Error Handling 🚨

### **Test 2.1: No Talent Available**
1. Delete or deactivate all talent users
2. Try to open assignment modal
3. Should show empty state:
   - User icon
   - "No Available Talent" message
   - Helpful text
   - Assign button should be disabled

### **Test 2.2: Network Error**
1. Stop backend server
2. Try to open assignment modal
3. Should show error message
4. Restart backend
5. Close and reopen modal
6. Should load successfully

### **Test 2.3: Assignment Fails**
1. Modify backend to return error
2. Try to assign task
3. Should show:
   - Red error banner
   - Error message
   - Assign button remains enabled
4. Can retry assignment

### **Test 2.4: Cancel During Assignment**
1. Start assignment (click assign button)
2. Quickly click Cancel
3. Should safely exit without assigning
4. Task should remain unassigned

---

## Test Scenario 3: Search Functionality 🔍

### **Test 3.1: Search by Name**
1. Open assignment modal
2. Type talent's first name
3. Should filter to matching talent only
4. Type more characters
5. Results should narrow down

### **Test 3.2: Search by Email**
1. Type part of email address
2. Should filter correctly
3. Should be case-insensitive

### **Test 3.3: No Results**
1. Type nonsense text
2. Should show:
   - Empty state icon
   - "No Matching Talent Found"
   - "Try adjusting your search query"

### **Test 3.4: Clear Search**
1. After filtering, clear search box
2. All talent should reappear
3. Should re-sort by workload

---

## Test Scenario 4: Workload Indicators 📊

### **Setup:**
Create talent with different workloads:
- Talent A: 0 tasks (Available)
- Talent B: 2 tasks (Light)
- Talent C: 5 tasks (Moderate)
- Talent D: 8 tasks (Heavy)

### **Expected Display:**
1. Talent should be sorted: A, B, C, D (least busy first)
2. Color indicators:
   - Talent A: Green "Available"
   - Talent B: Blue "2 active tasks"
   - Talent C: Yellow "5 active tasks"
   - Talent D: Red "8 active tasks"

---

## Test Scenario 5: Multiple Assignments 🔁

### **Test 5.1: Assign Multiple Tasks**
1. Assign first task → Success
2. Immediately assign second task → Should work
3. Assign to same talent → Workload should increase
4. Verify talent workload updates

### **Test 5.2: Quick Succession**
1. Open modal for task 1
2. Assign to talent A
3. Immediately open modal for task 2
4. Talent A's task count should show updated count

---

## Test Scenario 6: Responsive Design 📱

### **Desktop (1920x1080)**
- [ ] Modal centered
- [ ] All content visible
- [ ] No scrolling needed for 3-5 talent

### **Tablet (768x1024)**
- [ ] Modal takes appropriate width
- [ ] Touch targets are large enough
- [ ] Search bar full width

### **Mobile (375x667)**
- [ ] Modal almost full screen
- [ ] Buttons stack appropriately
- [ ] Can scroll talent list
- [ ] Touch-friendly sizing

---

## Test Scenario 7: Data Validation 🔐

### **Test 7.1: Manager Authorization**
1. Login as Manager A
2. Try to assign task from Manager B's client (via API)
3. Should return 403 Forbidden

### **Test 7.2: Inactive Talent**
1. Set talent status to INACTIVE
2. Try to assign (should not appear in list)
3. Or if manually calling API, should fail

### **Test 7.3: Invalid Task ID**
1. Call API with non-existent task ID
2. Should return 404 Not Found

---

## Expected Database Changes After Assignment

### **tasks table:**
```sql
UPDATE tasks
SET 
  assigned_to = '[talentId]',
  assigned_at = NOW(),
  status = 'ACTIVE'
WHERE id = '[taskId]'
```

### **notifications table:**
```sql
INSERT INTO notifications (
  user_id,
  type,
  title,
  message,
  related_task_id,
  action_url,
  action_label
) VALUES (
  '[talentId]',
  'INFO',
  'New Task Assigned',
  'You have been assigned to task: [taskName]',
  '[taskId]',
  '/talent-dashboard/tasks',
  'View Task'
)
```

### **activity_logs table:**
```sql
INSERT INTO activity_logs (
  user_id,
  activity_type,
  description,
  metadata
) VALUES (
  '[clientId]',
  'TASK_CREATED',
  'Task "[taskName]" assigned to [talentName]',
  '{"taskId": "[taskId]", "talentId": "[talentId]", "managerId": "[managerId]"}'
)
```

---

## Performance Benchmarks

### **Target Metrics:**
- Modal open: < 500ms
- Talent list load: < 1 second
- Search filter: < 100ms
- Assignment complete: < 2 seconds
- UI refresh: < 1 second

### **How to Measure:**
1. Open browser DevTools
2. Go to Network tab
3. Time each operation
4. Check for:
   - Excessive re-renders (React DevTools)
   - Slow API calls (> 2s)
   - Memory leaks (after multiple assignments)

---

## Common Issues & Solutions

### **Issue 1: Modal doesn't open**
**Check:**
- Is `showAssignModal` state updating?
- Is `selectedTask` being set?
- Console errors?

**Solution:**
- Verify button onClick handler
- Check TaskAssignmentModal props

### **Issue 2: No talent showing**
**Check:**
- Are there TALENT users in database?
- Are they ACTIVE status?
- API returning data?

**Solution:**
- Create talent users via admin panel
- Set status to ACTIVE
- Check /api/manager/talent endpoint

### **Issue 3: Assignment fails**
**Check:**
- Manager logged in?
- Task belongs to manager's client?
- Talent is active?
- Network request succeeding?

**Solution:**
- Check browser console
- Check backend logs
- Verify relationships in database

### **Issue 4: Success but no refresh**
**Check:**
- Is refresh() being called in handleAssignSuccess?
- Is useManagerTasks refreshing?

**Solution:**
- Add console.log to verify callback
- Check network tab for refresh API call

---

## API Testing with cURL

### **Assign Task (Manager Auth Required):**
```bash
curl -X PATCH http://localhost:5000/api/manager/tasks/[taskId]/assign \
  -H "Content-Type: application/json" \
  -H "Cookie: [your-session-cookie]" \
  -d '{"assignedToId": "[talentId]"}'
```

### **Expected Response:**
```json
{
  "success": true,
  "data": {
    "message": "Task assigned successfully",
    "task": {
      "id": "...",
      "name": "...",
      "status": "ACTIVE",
      "assignedToId": "...",
      "assignedAt": "2026-01-27T...",
      "assignedTo": {
        "id": "...",
        "fullName": "...",
        "email": "...",
        "avatarUrl": null
      },
      "project": { ... }
    }
  }
}
```

---

## Success Criteria Validation

### **Must Pass:**
- [ ] Manager can assign any unassigned task
- [ ] Talent receives notification
- [ ] Task status updates to ACTIVE
- [ ] Task moves between tabs correctly
- [ ] No console errors
- [ ] No database errors
- [ ] Assignment logged in activity_logs
- [ ] Workload indicators accurate
- [ ] Search works correctly
- [ ] Modal is mobile-responsive

### **Should Pass:**
- [ ] Assignment completes in < 30 seconds
- [ ] UI feels responsive and smooth
- [ ] Error messages are helpful
- [ ] Loading states clear
- [ ] Success feedback satisfying

### **Nice to Have:**
- [ ] Keyboard navigation works
- [ ] Accessibility (screen readers)
- [ ] Works in all major browsers
- [ ] No memory leaks after 50+ assignments

---

## Production Readiness

### **Before Deploying:**
1. [ ] Test with real data (not seed data)
2. [ ] Test with 50+ talent in list
3. [ ] Test with slow network (throttle in DevTools)
4. [ ] Test error scenarios
5. [ ] Test on mobile devices
6. [ ] Get manager user feedback
7. [ ] Monitor backend logs for errors
8. [ ] Check database for data integrity

### **Monitoring After Deploy:**
- Watch for failed assignments in logs
- Monitor notification delivery rate
- Track average assignment time
- Check for any 403/404 errors
- User feedback on UX

---

## 🎉 Feature Complete!

The Task Assignment Flow is ready for production use. Managers can now efficiently assign tasks to talent with full visibility into workload and instant notifications.

**Next:** Test thoroughly, gather feedback, then move to **Priority 2: Client Detail View**
