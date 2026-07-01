# Bee-Aura Three Demo Package Architecture

Status: DESIGN

Bee-Aura has three noticeably different demo experiences:

1. Solo Demo
2. Team Demo
3. Control Centre Demo

They share one Bee-Aura AI brain and brand system, but they are not meant to look identical.

## Solo

Solo is for owner-operators.

It should feel like a simple phone-friendly AI assistant.

Main idea: what do I need to do today?

Pages:
- /solo
- /solo/today
- /solo/inbox
- /solo/jobs
- /solo/customers

## Team

Team is for businesses with an admin, receptionist, coordinator or multiple engineers.

It should feel like a shared operations board.

Main idea: who needs to do what, and what needs owner approval?

Pages:
- /team
- /team/queue
- /team/assignments
- /team/approvals
- /team/customers

## Control Centre

Control Centre is the premium desktop command view.

It should feel deeper, more powerful and more like the original full demo, but simplified.

Main idea: show me the business, proof, reports, system issues and control settings.

Pages:
- /control-centre
- /control-centre/overview
- /control-centre/reports
- /control-centre/proof
- /control-centre/system
- /control-centre/settings

## AI rule

Use as much AI as possible for drafting, prioritising, summarising, explaining, reporting and risk detection.

Owner approval stays required for risky actions.

## Mobile rule

Mobile stays simple across all demos.
