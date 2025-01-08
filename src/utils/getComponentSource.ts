export const getComponentSource = async (filePath: string) => {
  try {
    const response = await fetch(`/api/source?path=${encodeURIComponent(filePath)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to load source');
    }
    
    return data.content;
  } catch (error) {
    console.error('Error loading component source:', error);
    return '// Error loading component source';
  }
};
