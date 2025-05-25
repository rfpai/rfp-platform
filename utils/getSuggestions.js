import sampleResponses from '../data/assistant/sample_responses.json';
import workScopes from '../data/assistant/work_scopes.json';

export default function getSuggestions(questionId, serviceType = 'marketing') {
  if (!questionId) return null;

  if (questionId === 'scopeOfWork') {
    return workScopes[serviceType] || [];
  }

  const section = sampleResponses[questionId];
  if (section) {
    return section[serviceType] || null;
  }

  return null;
}
