---
title: 'University ERP System'
question: 'How can role-based university workflows be separated cleanly in a desktop ERP?'
summary: 'A two-person academic Java Swing and MySQL project for role-separated administration, instruction, and student workflows.'
recruiterSummary: 'University ERP is a two-person academic team project built as a Java Swing desktop application with Gradle and MySQL. I contributed within the coordinated team effort, without claiming individual ownership of every UI, service, or database component. The repository separates authentication and ERP data into two MySQL schemas and documents administrator, instructor, and student roles. It is useful evidence of multi-tier application structure and role-aware workflow design. It remains an academic artifact: no institutional adoption, business impact, production security, or reliability outcome is claimed.'
metaDescription: 'A two-person academic University ERP built with Java Swing, Gradle, and separate MySQL authentication and ERP schemas.'
status: archived
role: team-project
teamSize: 2
contribution: 'Contributed within a two-person team to a multi-tier desktop ERP; the work is presented as coordinated delivery rather than sole ownership of UI, services, or database design.'
creditNote: 'AP_Project team work; role-specific services, schema setup, and desktop workflows are credited as shared project artifacts.'
evidenceClass: artifact
stack:
  - Java
  - Java Swing
  - Gradle
  - MySQL
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/AP_Project'
    kind: source
  - label: 'Setup guide'
    url: 'https://github.com/leelanshkharbanda/AP_Project/blob/master/univ-erp/docs/SETUP.md'
    kind: report
results:
  - claim: 'Role-separated workflows are represented in the academic artifact'
    value: 'Administrator, instructor, and student roles with separate authentication and ERP schemas'
    evidenceClass: artifact
    method: 'Repository setup guide and Java service tree document seeded roles, AuthService, AccessControlService, and role-specific services.'
    source: 'https://github.com/leelanshkharbanda/AP_Project'
limits:
  - 'The repository is an academic desktop project and provides no evidence of institutional adoption or business impact.'
  - 'Seeded demonstration accounts are setup fixtures, not a production identity or security design.'
  - 'No load, reliability, accessibility, or production-readiness evaluation is established by the source artifact.'
nextStep: 'Add end-to-end tests for role permissions and document a clean database migration and configuration path.'
diagram: none
diagramAlt: 'No project image is used; the University ERP archive is represented by text and source links.'
diagramCaption: 'Text-only archive entry with no reused interface screenshot or third-party visual asset.'
depth: archive
visualRights: original
checkedOn: '2026-11-25'
draft: false
---

## Context

University ERP is a two-person academic project structured as a multi-tier Java desktop application. Java Swing provides the interface, Gradle manages the build, and MySQL stores data in separate authentication and ERP schemas. The documented roles cover administration, instruction, and student workflows. That separation makes the project a useful example of role-aware desktop architecture rather than a single undifferentiated database screen.

## Contribution and credit

The project was coordinated team work. I contributed within the two-person effort, but the repository does not justify assigning every UI panel, service method, or schema decision to one person. Credit therefore stays with the shared artifact: the desktop client, access-control and role-specific services, database scripts, and setup documentation. This archive entry deliberately avoids sole-authorship language.

## Evidence

The source repository contains the Gradle project, Java services, authentication and ERP table scripts, seed data, and a setup guide. The guide documents Java 17+, MySQL 8, database creation, build commands, and seeded role accounts. Those materials are **artifact/source evidence** that the academic system was assembled and made runnable. They show structure and intended workflows, not measured outcomes. No custom visual is used for this entry.

## Limits

This is an academic prototype, not an adopted university system. Seeded accounts and local database settings are demonstration fixtures, not a production security design. The repository establishes no business impact, user volume, load result, reliability target, or production readiness. A sound next step is to test role permissions end to end and document database migration and configuration handling before making any deployment claim.
