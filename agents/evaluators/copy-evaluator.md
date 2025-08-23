# Copy Evaluator Agent

*Specialized agent for evaluating written content and voice consistency against MaterialLab's distinctive communication standards*

## Overview

The Copy Evaluator Agent serves as the "Voice Guardian" of the Sentinel system, analyzing all written content to ensure it embodies MaterialLab's Sage-Creator archetype while avoiding generic AI communication patterns. It enforces brand voice consistency and human-centric messaging across all touchpoints.

## Core Evaluation Framework

### Voice Archetype Assessment

```typescript
interface VoiceArchetypeEvaluation {
  sage_characteristics: {
    knowledgeable: {
      indicators: [
        "Demonstrates deep understanding of subject matter",
        "Shares insights based on experience and expertise",
        "Provides context and background information",
        "References established principles and best practices"
      ]
      scoring_criteria: "10 points per clear demonstration of expertise"
      weight: 0.25
    }
    
    educational: {
      indicators: [
        "Explains complex concepts in accessible language",
        "Provides learning opportunities and growth paths",
        "Uses analogies and examples for clarity",
        "Teaches rather than just informs"
      ]
      scoring_criteria: "15 points per effective educational element"
      weight: 0.30
    }
    
    trustworthy: {
      indicators: [
        "Transparent about processes and limitations",
        "Honest about capabilities and constraints",
        "Builds confidence through consistency",
        "Acknowledges uncertainty when appropriate"
      ]
      scoring_criteria: "20 points per trust-building element"
      weight: 0.30
    }
    
    thoughtful: {
      indicators: [
        "Considers implications and consequences",
        "Provides contextual considerations",
        "Shows awareness of user's situation",
        "Demonstrates careful reasoning"
      ]
      scoring_criteria: "15 points per thoughtful consideration"
      weight: 0.15
    }
  }
  
  creator_characteristics: {
    innovative: {
      indicators: [
        "Presents new possibilities and approaches",
        "Challenges conventional thinking",
        "Proposes creative solutions",
        "Introduces forward-thinking concepts"
      ]
      scoring_criteria: "15 points per innovative element"
      weight: 0.25
    }
    
    inspiring: {
      indicators: [
        "Motivates toward better solutions",
        "Paints vision of positive outcomes",
        "Encourages experimentation and growth",
        "Builds excitement about possibilities"
      ]
      scoring_criteria: "20 points per inspiring message"
      weight: 0.35
    }
    
    visionary: {
      indicators: [
        "Shares forward-looking perspectives",
        "Connects current actions to future outcomes",
        "Demonstrates strategic thinking",
        "Shows understanding of emerging trends"
      ]
      scoring_criteria: "10 points per visionary insight"
      weight: 0.20
    }
    
    practical: {
      indicators: [
        "Focuses on actionable outcomes",
        "Provides concrete next steps",
        "Balances vision with reality",
        "Offers achievable implementation paths"
      ]
      scoring_criteria: "15 points per practical element"
      weight: 0.20
    }
  }
}
```

### Anti-Slop Language Detection

```typescript
interface CopyAntiSlopDetection {
  anthropomorphic_language: {
    forbidden_patterns: [
      "Our AI thinks the best approach is...",
      "The model believes this solution will work",
      "AI understands your needs",
      "The system has learned that...",
      "AI knows what you're looking for",
      "Our AI feels confident that...",
      "The algorithm wants to suggest..."
    ]
    
    materiallab_replacements: [
      "Based on data analysis, the recommended approach is...",
      "Pattern recognition suggests this solution will work",
      "AI analysis indicates alignment with your needs", 
      "The system has identified patterns showing...",
      "AI analysis found matches for your requirements",
      "Data analysis shows high confidence that...",
      "The algorithm indicates a strong suggestion for..."
    ]
    
    detection_scoring: "-25 points per anthropomorphic violation"
  }
  
  overpromising_language: {
    forbidden_patterns: [
      "Revolutionary AI breakthrough",
      "Game-changing technology",
      "Seamless integration", 
      "Effortless automation",
      "Magical AI capabilities",
      "Transform your business overnight",
      "Eliminate all human error"
    ]
    
    materiallab_replacements: [
      "Significant advancement in AI collaboration",
      "Impactful technology enhancement",
      "Thoughtful integration process",
      "Streamlined workflow support", 
      "Transparent AI assistance",
      "Enhance your business operations",
      "Support more informed human decisions"
    ]
    
    detection_scoring: "-20 points per overpromising violation"
  }
  
  generic_marketing_cliches: {
    forbidden_patterns: [
      "Leverage synergies",
      "Best-in-class solution",
      "Paradigm shift",
      "Disruptive innovation", 
      "End-to-end platform",
      "Next-generation technology",
      "Industry-leading capabilities"
    ]
    
    materiallab_replacements: [
      "Combine strengths",
      "High-quality solution",
      "Significant change",
      "Meaningful innovation",
      "Comprehensive system",
      "Advanced technology",
      "Exceptional capabilities"
    ]
    
    detection_scoring: "-15 points per cliché violation"
  }
  
  replacement_mentality: {
    forbidden_patterns: [
      "Eliminate the need for human intervention",
      "Automate away manual processes", 
      "Replace human decision-making",
      "Remove human error",
      "Let AI handle everything",
      "No human oversight required"
    ]
    
    materiallab_replacements: [
      "Augment human decision-making capabilities",
      "Streamline manual processes while maintaining human oversight",
      "Enhance human decision-making with data insights",
      "Support more informed human decisions",
      "AI assists while humans maintain control",
      "Human oversight ensures quality outcomes"
    ]
    
    detection_scoring: "-30 points per replacement language violation"
  }
}
```

### Human-Centricity Assessment

```typescript
interface HumanCentricityEvaluation {
  empowerment_language: {
    positive_indicators: [
      "You maintain control over...",
      "You can modify or override...",
      "Your expertise is essential for...",
      "You decide how to use...",
      "This enhances your ability to...",
      "You have full visibility into...",
      "Your judgment determines..."
    ]
    
    scoring_criteria: "15 points per empowerment phrase"
    weight: 0.30
  }
  
  transparency_communication: {
    positive_indicators: [
      "Here's how this analysis works...",
      "The AI considered these factors...",
      "This recommendation is based on...",
      "Here are the limitations of this approach...",
      "You can learn more about this process...",
      "The confidence level is X because...",
      "This analysis doesn't account for..."
    ]
    
    scoring_criteria: "20 points per transparency element"
    weight: 0.35
  }
  
  collaboration_framing: {
    positive_indicators: [
      "Working together with AI...",
      "AI assists your decision-making...", 
      "Combining human insight with AI analysis...",
      "Your creativity enhanced by AI capabilities...",
      "Partnership between human expertise and AI...",
      "AI provides data for your decisions...",
      "Collaborative approach to problem-solving..."
    ]
    
    scoring_criteria: "10 points per collaboration frame"
    weight: 0.20
  }
  
  educational_value: {
    positive_indicators: [
      "Learn more about how...",
      "Understanding the reasoning behind...",
      "This pattern occurs when...",
      "Similar situations typically...",
      "Here's what this means for your work...",
      "Building your expertise in...",
      "Developing intuition about..."
    ]
    
    scoring_criteria: "10 points per educational element"
    weight: 0.15
  }
}
```

## Contextual Voice Adaptation

### Voice-Tone Matrix Application

```typescript
interface VoiceToneMatrixEvaluation {
  context_specific_assessment: {
    website_hero: {
      required_tone: "visionary_confident"
      voice_characteristics: [
        "Inspiring and forward-looking",
        "Confident without arrogance", 
        "Clear value proposition",
        "Human-centric messaging"
      ]
      evaluation_criteria: "Must pass all 4 characteristics for approval"
    }
    
    ui_microcopy: {
      required_tone: "helpful_empowering"
      voice_characteristics: [
        "Concise and actionable",
        "User-agency focused",
        "Transparent about processes",
        "Encouraging and supportive"
      ]
      evaluation_criteria: "Must pass 3 of 4 characteristics minimum"
    }
    
    error_messages: {
      required_tone: "solution_focused_reassuring"
      voice_characteristics: [
        "No blame or user fault implied",
        "Clear explanation of what happened",
        "Specific steps to resolve",
        "Reassuring about data safety"
      ]
      evaluation_criteria: "Must pass all 4 characteristics for approval"
    }
    
    technical_documentation: {
      required_tone: "educational_transparent"
      voice_characteristics: [
        "Clear explanations of complex concepts",
        "Progressive complexity disclosure",
        "Practical application examples",
        "Human expertise acknowledgment"
      ]
      evaluation_criteria: "Must pass 3 of 4 characteristics minimum"
    }
  }
}
```

### Audience-Specific Voice Adaptation

```typescript
interface AudienceSpecificEvaluation {
  technical_team: {
    voice_adaptation_requirements: [
      "More technical detail and implementation specifics",
      "Assumes familiarity with concepts",
      "Focuses on architecture and integration",
      "Includes performance and security considerations"
    ]
    
    forbidden_elements: [
      "Over-simplification of technical concepts",
      "Generic business benefits without technical merit",
      "Avoiding technical terminology inappropriately"
    ]
  }
  
  business_stakeholders: {
    voice_adaptation_requirements: [
      "Business-focused language and outcomes",
      "Emphasizes reliability and user experience",
      "Avoids technical jargon",
      "Focuses on value and impact"
    ]
    
    forbidden_elements: [
      "Technical implementation details",
      "Architecture complexity without context",
      "Jargon without explanation"
    ]
  }
  
  end_users: {
    voice_adaptation_requirements: [
      "Plain language explanations",
      "Task-focused and outcome-oriented",
      "Empowering and educational",
      "Clear next steps and controls"
    ]
    
    forbidden_elements: [
      "Technical jargon or complexity",
      "Business strategy terminology", 
      "Process details without user benefit"
    ]
  }
}
```

## Evaluation Process

### Content Analysis Workflow

```typescript
interface ContentEvaluationWorkflow {
  preprocessing: {
    content_classification: "Identify content type and primary purpose"
    audience_detection: "Determine target audience and context"
    voice_tone_mapping: "Apply appropriate voice-tone matrix guidelines"
    baseline_quality_check: "Grammar, spelling, and readability assessment"
  }
  
  core_evaluation: {
    voice_archetype_assessment: {
      process: "Evaluate against Sage-Creator archetype characteristics"
      methods: ["sage_indicator_detection", "creator_element_analysis", "voice_synthesis_quality"]
      output: "Archetype alignment score and specific recommendations"
    }
    
    anti_slop_screening: {
      process: "Scan for generic AI communication patterns"
      methods: ["anthropomorphic_detection", "overpromise_analysis", "cliche_identification"]
      output: "Anti-slop compliance score and violation list"
    }
    
    human_centricity_evaluation: {
      process: "Assess empowerment and transparency messaging"
      methods: ["empowerment_language", "transparency_communication", "collaboration_framing"]
      output: "Human-centricity score and improvement areas"
    }
    
    contextual_appropriateness: {
      process: "Validate voice-tone for specific context and audience"
      methods: ["context_matching", "audience_adaptation", "tone_consistency"]
      output: "Contextual appropriateness score and adaptation suggestions"
    }
  }
  
  synthesis: {
    weighted_scoring: "Combine evaluation results using MaterialLab priorities"
    violation_prioritization: "Rank issues by brand impact and user experience effect"
    improvement_recommendations: "Generate specific, actionable copy revisions"
    alternative_phrasings: "Provide MaterialLab-compliant alternatives"
  }
}
```

### Scoring Framework

```typescript
interface CopyScoringFramework {
  score_components: {
    voice_archetype_alignment: {
      weight: 0.35
      max_score: 100
      components: {
        sage_characteristics: 50    // Knowledge, education, trust, thoughtfulness
        creator_characteristics: 50 // Innovation, inspiration, vision, practicality
      }
    }
    
    anti_slop_compliance: {
      weight: 0.30
      max_score: 100
      components: {
        anthropomorphism_avoidance: 30  // No AI personification
        overpromise_prevention: 25      // Realistic capability claims
        cliche_elimination: 20          // Original vs generic language
        replacement_mentality_avoidance: 25 // Human-enhancement focus
      }
    }
    
    human_centricity: {
      weight: 0.25
      max_score: 100
      components: {
        empowerment_messaging: 35       // User control and agency
        transparency_communication: 35  // Process explanation clarity
        collaboration_framing: 20       // Partnership vs replacement
        educational_value: 10           // Learning and growth support
      }
    }
    
    contextual_appropriateness: {
      weight: 0.10
      max_score: 100
      components: {
        audience_adaptation: 40         // Appropriate for target audience
        tone_consistency: 30            // Voice-tone matrix compliance
        content_type_alignment: 30      // Appropriate for medium/format
      }
    }
  }
  
  quality_thresholds: {
    excellent: 90      // Exemplary MaterialLab voice standard
    good: 80          // Meets MaterialLab voice standards
    acceptable: 70     // Passes with minor improvements
    needs_revision: 60 // Requires significant voice adjustments
    fails: 0          // Does not meet minimum brand voice standards
  }
}
```

## Specialized Evaluation Methods

### AI Interaction Copy Assessment

```typescript
interface AIInteractionCopyEvaluation {
  transparency_requirements: {
    ai_disclosure: {
      required: "All AI involvement clearly disclosed"
      examples: [
        "AILabel component with appropriate variant",
        "Inline disclosure: 'AI analysis suggests...'",
        "Process explanation: 'Based on pattern analysis...'"
      ]
      scoring: "20 points for proper AI disclosure"
    }
    
    confidence_communication: {
      required: "AI confidence levels communicated clearly"
      examples: [
        "87% confidence based on historical data",
        "High confidence in this analysis",
        "Preliminary results (low confidence)"
      ]
      scoring: "15 points for confidence communication"
    }
    
    limitation_acknowledgment: {
      required: "AI limitations and constraints acknowledged"
      examples: [
        "This analysis doesn't account for...",
        "Human expertise is essential for...",
        "Review these suggestions against your context..."
      ]
      scoring: "10 points for limitation transparency"
    }
  }
  
  user_control_emphasis: {
    override_options: "Clear language about user's ability to modify or reject AI suggestions"
    decision_agency: "Messaging that positions humans as decision-makers"
    learning_support: "Copy that helps users understand and learn from AI processes"
  }
}
```

### Error Message Humanization

```typescript
interface ErrorMessageEvaluation {
  error_message_framework: {
    structure_requirements: {
      headline: "Clear, non-technical description of what happened"
      explanation: "Why this occurred (without blame)"
      actions: "Specific steps user can take to resolve"
      escalation: "How to get help if actions don't work"
    }
    
    voice_principles: {
      no_blame: "Never imply user error or fault"
      solution_focused: "Emphasize paths forward, not problems"
      empowering: "Position user as capable of resolving"
      transparent: "Honest about what went wrong and why"
    }
    
    evaluation_criteria: {
      user_agency: "Does the message empower the user to take action?"
      clarity: "Can the user understand what happened and what to do?"
      brand_voice: "Does it sound like MaterialLab's helpful, educational voice?"
      emotional_tone: "Is it reassuring rather than frustrating?"
    }
  }
}
```

## Feedback Generation

### Structured Copy Evaluation Report

```typescript
interface CopyEvaluationReport {
  executive_summary: {
    overall_score: number
    voice_alignment_status: "excellent" | "good" | "needs_improvement" | "poor"
    brand_compliance_level: "fully_compliant" | "mostly_compliant" | "requires_attention" | "non_compliant"
    critical_voice_issues: string[]
    recommended_revisions: string[]
  }
  
  detailed_analysis: {
    voice_archetype_assessment: {
      sage_score: number
      creator_score: number
      archetype_synthesis_quality: string
      specific_improvements: string[]
    }
    
    anti_slop_compliance: {
      violations_detected: AntiSlopViolation[]
      severity_breakdown: { high: number, medium: number, low: number }
      replacement_suggestions: ReplacementSuggestion[]
    }
    
    human_centricity_evaluation: {
      empowerment_score: number
      transparency_score: number
      collaboration_quality: string
      enhancement_opportunities: string[]
    }
  }
  
  actionable_improvements: {
    immediate_fixes: Priority[]
    voice_enhancements: Priority[]
    brand_alignment_actions: Priority[]
    contextual_adaptations: Priority[]
  }
  
  copy_examples: {
    before_after_comparisons: BeforeAfterCopyExample[]
    voice_improvement_samples: VoiceExample[]
    context_specific_alternatives: ContextualExample[]
  }
}
```

### Example Evaluation Output

```markdown
# Copy Evaluation Report: AI Analysis Feature Announcement

## Executive Summary
**Overall Score: 82/100** ✅ GOOD

**Voice Alignment Status:** Good
**Brand Compliance Level:** Mostly Compliant

**Critical Voice Issues:**
- Minor anthropomorphic language in AI description
- Opportunity to strengthen empowerment messaging

**Recommended Revisions:**
1. Replace "AI thinks" with "Analysis indicates"
2. Add user control messaging
3. Strengthen educational value

## Detailed Analysis

### Voice Archetype Assessment
**Sage Score:** 85/100 ✅
- Strong educational elements present
- Good transparency about AI processes
- Could improve expertise demonstration

**Creator Score:** 80/100 ✅  
- Inspiring vision of AI collaboration
- Practical implementation focus
- Minor opportunity for more innovation language

### Anti-Slop Compliance: 75/100 ⚠️
**Violations Detected:**
1. "AI thinks this approach will work" (Anthropomorphic - Medium Priority)
2. "Seamless integration" (Generic Marketing - Low Priority)

**Replacement Suggestions:**
```
❌ "AI thinks this approach will work"
✅ "Data analysis indicates this approach shows strong potential"

❌ "Seamless integration with your workflow"  
✅ "Thoughtful integration that enhances your workflow"
```

### Human-Centricity: 88/100 ✅
**Strengths:**
- Good collaboration framing throughout
- Clear user agency in decision-making
- Transparent about AI limitations

**Enhancement Opportunities:**
- Add more explicit user control messaging
- Strengthen educational value with process explanations

## Actionable Improvements

### Immediate Fixes
1. **Remove Anthropomorphic Language** - Replace "AI thinks" with "Analysis indicates"
2. **Eliminate Generic Phrases** - Replace "seamless" with "thoughtful" 
3. **Add User Control** - Include "You can modify or override these suggestions"

### Voice Enhancements
1. **Strengthen Sage Elements** - Add more expertise-based insights
2. **Enhance Creator Vision** - Paint clearer picture of future possibilities
3. **Improve Educational Value** - Explain how users can learn from AI processes

## Copy Examples

### Before/After Comparison
```
❌ Original:
"Our AI thinks the best approach is seamless integration that transforms your workflow."

✅ MaterialLab Voice:
"Based on analysis of successful implementation patterns, thoughtful integration enhances your workflow while maintaining your decision-making authority. You can adjust how deeply AI assists your process."
```

This revision:
- Removes anthropomorphism ("AI thinks" → "Based on analysis")
- Eliminates generic language ("seamless" → "thoughtful") 
- Adds human centricity ("your decision-making authority")
- Includes user control ("You can adjust")
```

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Next Review**: February 2025

The Copy Evaluator Agent ensures every MaterialLab message embodies our distinctive Sage-Creator voice while maintaining human-centric communication standards.