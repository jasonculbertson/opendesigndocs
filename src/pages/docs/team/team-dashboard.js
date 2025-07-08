// Team Dashboard JavaScript functionality

class TeamDashboard {
  constructor() {
    this.teamMembers = [];
    this.rolesTitles = {
      "Product Designer": [
        "Designer I", "Designer II", "Sr. Designer", "Lead Designer", 
        "Staff Designer", "Principal Designer", "Design Manager", 
        "Sr. Design Manager", "Group Design Manager", "Design Director", "Sr. Design Director"
      ],
      "Content Designer": [
        "Content Designer I", "Content Designer II", "Sr. Content Designer", 
        "Lead Content Director", "Staff Content Designer", "Principal Content Designer",
        "Content Design Manager", "Sr. Content Design Manager", "Group Content Design Manager",
        "Content Design Director", "Sr. Content Design Director"
      ],
      "User Researcher": [
        "User Researcher I", "User Researcher II", "Sr. User Researcher",
        "Lead User Researcher", "Staff User Researcher", "Principal User Researcher",
        "User Research Manager", "Sr. User Research Manager", "Group User Research Manager",
        "User Research Director", "Sr. User Research Director"
      ],
      "Design Ops": [
        "Design Ops Manager I", "Design Ops Manager II", "Sr. Design Ops Manager",
        "Lead Design Ops Manager", "Staff Design Ops Manager", "Principal Design Ops Manager",
        "Design Ops Manager", "Sr. Design Ops Manager", "Group Design Ops Manager",
        "Design Ops Director", "Sr. Design Ops Director"
      ],
      "Graphic Designer": [
        "Jr. Designer", "Designer", "Sr. Designer", "Art Director",
        "Sr. Art Director", "Associate Creative Director", "Creative Director",
        "Sr. Creative Director", "Group Creative Director", "Executive Creative Director"
      ],
      "Copywriter": [
        "Jr. Copywriter", "Copywriter", "Sr. Copywriter", "Copy Director",
        "Sr. Copy Director", "Associate Creative Director", "Creative Director",
        "Sr. Creative Director", "Group Creative Director", "Executive Creative Director"
      ]
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadTeamData();
  }

  setupEventListeners() {
    // Add team member button
    const addBtn = document.getElementById('add-team-member-btn');
    addBtn?.addEventListener('click', () => this.openAddMemberModal());

    // Modal close button
    const cancelBtn = document.getElementById('cancel-add-member');
    cancelBtn?.addEventListener('click', () => this.closeAddMemberModal());

    // Form submission
    const submitBtn = document.getElementById('submit-add-member');
    submitBtn?.addEventListener('click', (e) => this.handleAddMember(e));

    // Role selection change
    const roleSelect = document.getElementById('role');
    roleSelect?.addEventListener('change', (e) => this.handleRoleChange(e.target.value));

    // Close modal on background click
    const modal = document.getElementById('add-member-modal');
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeAddMemberModal();
      }
    });
  }

  async loadTeamData() {
    try {
      const response = await fetch('/api/team/members');
      const result = await response.json();

      if (result.success) {
        this.teamMembers = result.data;
        this.updateUI();
      } else {
        console.error('Failed to load team data:', result.error);
        this.hideLoading();
        this.showEmptyState();
        
        // Check if it's an authentication error
        if (response.status === 401) {
          this.showError('Please log in to view your team members');
        } else {
          this.showError('Failed to load team data');
        }
      }
    } catch (error) {
      console.error('Error loading team data:', error);
      this.hideLoading();
      this.showEmptyState();
      this.showError('Failed to load team data');
    }
  }

  updateUI() {
    this.hideLoading();
    
    if (this.teamMembers.length === 0) {
      this.showEmptyState();
    } else {
      this.showTeamMembers();
      this.updateStats();
    }
  }

  updateStats() {
    const totalMembers = this.teamMembers.length;
    const activeMembers = this.teamMembers.filter(m => m.status === 'active').length;
    const recentConversations = this.teamMembers.reduce((sum, m) => sum + (m.conversation_count || 0), 0);
    const activeGoals = this.teamMembers.reduce((sum, m) => sum + (m.active_goals_count || 0), 0);

    document.getElementById('total-members').textContent = totalMembers;
    document.getElementById('active-members').textContent = activeMembers;
    document.getElementById('recent-conversations').textContent = recentConversations;
    document.getElementById('active-goals').textContent = activeGoals;
  }

  showTeamMembers() {
    const container = document.getElementById('team-members-container');
    const grid = document.getElementById('team-members-grid');
    
    container.innerHTML = '';
    
    this.teamMembers.forEach(member => {
      const memberCard = this.createMemberCard(member);
      container.appendChild(memberCard);
    });

    grid.classList.remove('hidden');
  }

  createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer';
    card.addEventListener('click', () => this.viewMemberDetails(member.id));

    const lastActivity = member.last_conversation_date 
      ? this.formatDate(member.last_conversation_date)
      : 'No recent activity';

    const statusColor = member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

    card.innerHTML = `
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <div class="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
        </div>
        <div class="flex-grow min-w-0">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900 truncate">${member.employee_name}</h3>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}">
              ${member.status}
            </span>
          </div>
          <p class="text-sm text-gray-500">${member.job_title}</p>
          <p class="text-sm text-gray-500">${member.level}</p>
        </div>
      </div>
      
      <div class="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-lg font-semibold text-gray-900">${member.conversation_count || 0}</p>
          <p class="text-xs text-gray-500">Conversations</p>
        </div>
        <div>
          <p class="text-lg font-semibold text-gray-900">${member.active_goals_count || 0}</p>
          <p class="text-xs text-gray-500">Goals</p>
        </div>
        <div>
          <p class="text-lg font-semibold text-gray-900">${member.assessment_count || 0}</p>
          <p class="text-xs text-gray-500">Assessments</p>
        </div>
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-200">
        <p class="text-xs text-gray-500">Last activity: ${lastActivity}</p>
      </div>
    `;

    return card;
  }

  viewMemberDetails(memberId) {
    // Navigate to member detail page
    window.location.href = `/docs/team/member/${memberId}`;
  }

  showEmptyState() {
    document.getElementById('empty-state').classList.remove('hidden');
    document.getElementById('team-members-grid').classList.add('hidden');
  }

  hideLoading() {
    document.getElementById('loading-state').classList.add('hidden');
  }

  openAddMemberModal() {
    document.getElementById('add-member-modal').classList.remove('hidden');
    // Set default start date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start_date').value = today;
  }

  closeAddMemberModal() {
    document.getElementById('add-member-modal').classList.add('hidden');
    this.resetForm();
  }

  resetForm() {
    document.getElementById('add-member-form').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start_date').value = today;
    document.getElementById('department').value = 'Design';
    
    // Reset title dropdown
    const titleSelect = document.getElementById('job_title');
    titleSelect.disabled = true;
    titleSelect.innerHTML = '<option value="">Select role first</option>';
  }

  handleRoleChange(selectedRole) {
    const titleSelect = document.getElementById('job_title');
    
    if (!selectedRole) {
      titleSelect.disabled = true;
      titleSelect.innerHTML = '<option value="">Select role first</option>';
      return;
    }

    const titles = this.rolesTitles[selectedRole] || [];
    
    // Enable the title dropdown
    titleSelect.disabled = false;
    
    // Clear and populate title options
    titleSelect.innerHTML = '<option value="">Select Title</option>';
    titles.forEach(title => {
      const option = document.createElement('option');
      option.value = title;
      option.textContent = title;
      titleSelect.appendChild(option);
    });
  }

  async handleAddMember(e) {
    e.preventDefault();
    
    const form = document.getElementById('add-member-form');
    const formData = new FormData(form);
    
    const memberData = {
      employee_name: formData.get('employee_name'),
      employee_email: formData.get('employee_email'),
      job_title: formData.get('job_title'),
      level: formData.get('job_title'), // Use job_title as the level for database compatibility
      department: formData.get('department') || 'Design',
      start_date: formData.get('start_date')
    };

    // Validate required fields
    if (!memberData.employee_name || !memberData.employee_email || 
        !memberData.job_title || !memberData.start_date) {
      this.showError('Please fill in all required fields');
      return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submit-add-member');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Adding...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/team/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData)
      });

      const result = await response.json();

      if (result.success) {
        this.closeAddMemberModal();
        this.loadTeamData(); // Refresh the team data
        this.showSuccess('Team member added successfully!');
      } else {
        this.showError(result.error || 'Failed to add team member');
      }
    } catch (error) {
      console.error('Error adding team member:', error);
      this.showError('Failed to add team member');
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showError(message) {
    // Create a simple toast notification
    this.showToast(message, 'error');
  }

  showSuccess(message) {
    // Create a simple toast notification
    this.showToast(message, 'success');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
      type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
      type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
      'bg-blue-100 text-blue-800 border border-blue-200'
    }`;
    
    toast.innerHTML = `
      <div class="flex items-center">
        <div class="flex-shrink-0">
          ${type === 'error' ? 
            '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>' :
            '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
          }
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium">${message}</p>
        </div>
        <div class="ml-auto pl-3">
          <button class="toast-close inline-flex text-gray-400 hover:text-gray-600">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 5000);

    // Handle close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn?.addEventListener('click', () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  }

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TeamDashboard();
}); 