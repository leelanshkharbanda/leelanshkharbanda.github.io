---
title: 'University ERP System'
summary: 'Two-person Java Swing and MySQL desktop ERP with role-based access for admins, instructors, and students.'
metaDescription: 'Two-person Java Swing, Gradle, and MySQL desktop ERP separating authentication and ERP schemas by role.'
status: archived
role: team-project
teamSize: 2
stack:
  - Java
  - Java Swing
  - Gradle
  - MySQL
links:
  - label: 'Source repository'
    url: 'https://github.com/leelanshkharbanda/AP_Project'
    kind: 'source'
  - label: 'Setup guide'
    url: 'https://github.com/leelanshkharbanda/AP_Project/blob/master/univ-erp/docs/SETUP.md'
    kind: 'report'
results:
  - claim: 'Role-based desktop architecture'
    value: 'Admin, instructor, and student workflows across separate auth and ERP schemas'
    evidenceClass: artifact
    method: 'Gradle Java project with AuthService, AccessControlService, and SQL schema scripts.'
    source: 'https://github.com/leelanshkharbanda/AP_Project'
diagram: none
diagramAlt: 'University ERP repository and setup guide links.'
diagramCaption: 'Java Swing client with separate MySQL auth and ERP schemas.'
depth: archive
draft: false
---

## Overview

A two-person Advanced Programming course project built with Java Swing, Gradle, and MySQL. It separates user authentication from ERP records across two MySQL schemas and gates admin, instructor, and student actions through `AuthService`, `AccessControlService`, and role-specific service handlers.

## Source

Gradle project, Java source, SQL table/seed scripts, and `SETUP.md` (Java 17+ and MySQL 8) are in [AP_Project](https://github.com/leelanshkharbanda/AP_Project).
