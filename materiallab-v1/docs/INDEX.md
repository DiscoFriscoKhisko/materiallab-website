# MaterialLab Design System Documentation

Welcome to the comprehensive design system for MaterialLab AI Product Studio. This documentation provides everything you need to understand, implement, and maintain our design system.

## 🎯 Getting Started

### For Designers
- Start with [Brand Pillars](style/00_pillars.md) to understand our core identity
- Review [Design Rules](style/02_rules.md) for implementation guidelines
- Check [Anti-Patterns](style/03_anti_patterns.md) to avoid common mistakes

### For Developers
- Begin with [Design Tokens](style/01_tokens.md) for implementation values
- Use [Design System Files](../design-system/) for machine-readable tokens
- Reference [Rules Checklist](../design-system/02_rules_checklist.md) during development

### For AI Agents
- Use [Design Builder](agents/design-builder.md) instructions when creating components
- Follow [Design Reviewer](agents/design-reviewer.md) guidelines when evaluating designs

## 📚 Documentation Structure

### 🎨 Style Foundation
- **[00_pillars.md](style/00_pillars.md)** - Brand identity, values, voice & tone
- **[01_tokens.md](style/01_tokens.md)** - Design tokens with rationale and usage
- **[02_rules.md](style/02_rules.md)** - Grid, layout, component, and accessibility rules
- **[03_anti_patterns.md](style/03_anti_patterns.md)** - Patterns to avoid across all areas
- **[04_decisions_log.md](style/04_decisions_log.md)** - Record of design decisions and changes

### 🧩 Component Specifications
Following atomic design methodology:

- **[atoms/](specs/atoms/)** - Basic building blocks (buttons, inputs, icons)
- **[molecules/](specs/molecules/)** - Component groups (cards, forms, navigation)
- **[organisms/](specs/organisms/)** - Complex components (headers, sections, layouts)

### 🤖 AI Agent Support
- **[design-builder.md](agents/design-builder.md)** - Instructions for building components
- **[design-reviewer.md](agents/design-reviewer.md)** - Instructions for reviewing designs

## 🛠️ Implementation Files

### Design System Core
- **[design-system/01_tokens.json](../design-system/01_tokens.json)** - Machine-readable tokens
- **[design-system/02_rules_checklist.md](../design-system/02_rules_checklist.md)** - Implementation checklist

### Code Integration
- **[styles/tokens.css](../styles/tokens.css)** - CSS custom properties
- **[tailwind.config.ts](../tailwind.config.ts)** - Tailwind CSS configuration

### Development Tools
- **[.storybook/](./../storybook/)** - Component documentation and testing
- **[tests/playwright/](../tests/playwright/)** - Visual regression testing

## 🚀 Quick Reference

### Core Brand Values
1. **Human-Centricity** - Technology that enhances, not replaces
2. **Radical Transparency** - Clear communication about AI capabilities
3. **Intentional Innovation** - Purpose-driven, not trend-driven
4. **Collaborative Intelligence** - Human-AI partnership approach

### Color Palettes
- **Humanistic Intelligence** - Navy, beige, orange, teal (warm, approachable)
- **Structured Dynamism** - Purple, charcoal, lime, cyan (bold, futuristic)

### Typography Scale
- **Primary (Inter)** - Headlines, UI elements
- **Secondary (Source Serif 4)** - Body text, long-form content
- **Monospace (JetBrains Mono)** - Code, technical content

## 📋 Contribution Guidelines

### Making Changes
1. **Document First** - Update relevant documentation before implementing
2. **Test Thoroughly** - Run visual regression tests and accessibility checks
3. **Update Decision Log** - Record rationale in [04_decisions_log.md](style/04_decisions_log.md)
4. **Review Process** - Use [design-reviewer.md](agents/design-reviewer.md) checklist

### Maintenance Schedule
- **Weekly** - Review new component additions
- **Monthly** - Update documentation and examples
- **Quarterly** - Comprehensive system audit and token review

## 🔗 External References

- [Brand Guidelines Document](../Brand%20notes.md) - Comprehensive brand strategy
- [Project Structure](../PROJECT_STRUCTURE.md) - Technical architecture
- [CLAUDE.md](../CLAUDE.md) - AI assistant instructions
- [Veo Design System](../VEO_DESIGN_SYSTEM.md) - Specialized component system

## 📞 Support

For questions about the design system:
1. Check this documentation first
2. Review [04_decisions_log.md](style/04_decisions_log.md) for historical context
3. Use [design-reviewer.md](agents/design-reviewer.md) for validation
4. Consult the core brand guidelines in [Brand notes.md](../Brand%20notes.md)

---

*Last updated: January 2025*
*Version: 1.0.0*