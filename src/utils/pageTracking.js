// Universal page tracking utility for documentation pages
// This script can be included on any page to automatically track page views and interactions

(function() {
  'use strict';
  
  function trackPageView() {
    const path = window.location.pathname;
    const title = document.title;
    const category = getPageCategory(path);
    
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        properties: {
          page: path,
          page_title: title,
          page_category: category,
          visitor_type: 'public',
          timestamp: new Date().toISOString(),
          referrer: document.referrer || null
        }
      })
    }).catch(err => console.error('Page tracking error:', err));
    
    console.log(`📊 Tracked page view: ${title} (${category})`);
  }
  
  function getPageCategory(path) {
    if (path.includes('/levels/')) return 'levels';
    if (path.includes('/manager/')) return 'manager';
    if (path.includes('/leadership/')) return 'leadership';
    if (path.includes('/recruiters/')) return 'recruiters';
    if (path.includes('/design-team/')) return 'design-team';
    if (path.includes('/product-team/')) return 'product-team';
    if (path.includes('/team/')) return 'team';
    if (path.includes('/videos/')) return 'videos';
    if (path.includes('/reviews-ai')) return 'reviews-ai';
    return 'docs';
  }
  
  function trackLinkClicks() {
    // Track internal documentation links
    document.querySelectorAll('a[href^="/docs/"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const linkText = this.textContent.trim();
        const currentCategory = getPageCategory(window.location.pathname);
        
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'internal_link_click',
            properties: {
              link_url: href,
              link_text: linkText,
              current_page: window.location.pathname,
              current_category: currentCategory,
              target_category: getPageCategory(href),
              timestamp: new Date().toISOString()
            }
          })
        }).catch(err => console.error('Link tracking error:', err));
        
        console.log(`📊 Tracked internal link: ${linkText} -> ${href}`);
      });
    });
    
    // Track external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const linkText = this.textContent.trim();
        
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'external_link_click',
            properties: {
              link_url: href,
              link_text: linkText,
              current_page: window.location.pathname,
              current_category: getPageCategory(window.location.pathname),
              timestamp: new Date().toISOString()
            }
          })
        }).catch(err => console.error('External link tracking error:', err));
        
        console.log(`📊 Tracked external link: ${linkText} -> ${href}`);
      });
    });
  }
  
  function trackScrollDepth() {
    let maxScroll = 0;
    let scrollTracked = false;
    
    function checkScrollDepth() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }
      
      // Track when user scrolls past 75% (only once per page)
      if (scrollPercent > 75 && !scrollTracked) {
        scrollTracked = true;
        
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'deep_scroll',
            properties: {
              scroll_depth: scrollPercent,
              page: window.location.pathname,
              page_category: getPageCategory(window.location.pathname),
              timestamp: new Date().toISOString()
            }
          })
        }).catch(err => console.error('Scroll tracking error:', err));
        
        console.log(`📊 Tracked deep scroll: ${scrollPercent}%`);
      }
    }
    
    // Track scroll depth on page unload
    window.addEventListener('beforeunload', function() {
      if (maxScroll > 0) {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'page_scroll_depth',
            properties: {
              max_scroll_depth: maxScroll,
              page: window.location.pathname,
              page_category: getPageCategory(window.location.pathname),
              timestamp: new Date().toISOString()
            }
          })
        }).catch(err => console.error('Scroll depth tracking error:', err));
      }
    });
    
    window.addEventListener('scroll', checkScrollDepth);
  }
  
  function init() {
    trackPageView();
    trackLinkClicks();
    trackScrollDepth();
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Also initialize on Astro page transitions
  document.addEventListener('astro:page-load', init);
})();
