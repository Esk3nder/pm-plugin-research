# Launch Plan: {{Feature Name}}

**Owner:** {{PM name}}
**Target Date:** {{date}}
**Status:** Planning | Ready | Launched | Post-Launch

---

## Overview

**What:** [One sentence description]

**Why:** [Business/user impact]

**Who:** [Target users]

---

## Launch Checklist

### Pre-Launch

- [ ] Engineering complete
- [ ] QA sign-off
- [ ] Design review
- [ ] Documentation updated
- [ ] Support team briefed
- [ ] Marketing assets ready
- [ ] Monitoring in place

### Launch Day

- [ ] Feature flag enabled
- [ ] Monitoring dashboards checked
- [ ] Support on standby
- [ ] Social/blog published
- [ ] Email sent (if applicable)

### Post-Launch

- [ ] Metrics reviewed (24h)
- [ ] Metrics reviewed (7d)
- [ ] User feedback collected
- [ ] Retro scheduled

---

## Rollout Strategy

### Phase 1: Internal ({{date}})

- **Audience:** Internal team
- **Goal:** Catch obvious bugs
- **Duration:** 2-3 days

### Phase 2: Beta ({{date}})

- **Audience:** {{X%}} of users / specific segment
- **Goal:** Validate at scale
- **Duration:** 1 week
- **Success criteria:** {{metrics}}

### Phase 3: General Availability ({{date}})

- **Audience:** All users
- **Goal:** Full launch

---

## Success Criteria

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| {{Metric}} | {{target}} | - | - |
| {{Metric}} | {{target}} | - | - |

### Launch Success (Go/No-Go)

- [ ] No P0/P1 bugs
- [ ] Error rate < {{X%}}
- [ ] Key metric trending positive

---

## Rollback Plan

**Trigger:** [When do we roll back?]

**Process:**
1. Disable feature flag
2. Notify stakeholders
3. Investigate root cause
4. Post-incident review

**Owner:** {{name}}

---

## Communication Plan

### Internal

| Audience | Channel | Timing | Message |
|----------|---------|--------|---------|
| Engineering | Slack | Launch day | "Feature live" |
| Support | Email | 1 day before | Training doc |
| Leadership | Slack | Launch day | Summary |

### External

| Audience | Channel | Timing | Message |
|----------|---------|--------|---------|
| All users | In-app | Launch | Feature announcement |
| Blog | Website | Launch day | Blog post |
| Social | Twitter | Launch day | Tweet thread |

---

## Dependencies

| Dependency | Owner | Status | Due |
|------------|-------|--------|-----|
| {{Dep}} | {{name}} | {{status}} | {{date}} |

---

## Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| {{Risk}} | {{L/M/H}} | {{L/M/H}} | {{plan}} |

---

## Team

| Role | Person | Responsibility |
|------|--------|----------------|
| PM | {{name}} | Overall owner |
| Eng Lead | {{name}} | Technical delivery |
| Design | {{name}} | UX sign-off |
| QA | {{name}} | Quality sign-off |
| Marketing | {{name}} | External comms |

---

## Timeline

| Date | Milestone |
|------|-----------|
| {{date}} | Engineering complete |
| {{date}} | QA complete |
| {{date}} | Internal launch |
| {{date}} | Beta launch |
| {{date}} | GA launch |

---

## Post-Launch Review

**Scheduled:** {{date}}

### Questions to Answer

1. Did we hit our success metrics?
2. What feedback did users give?
3. What would we do differently?
4. What follow-up work is needed?
