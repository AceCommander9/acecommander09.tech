# Project Images

This directory contains images for the "Featured Projects" section on the website.

## Naming Convention

Images should be named using **kebab-case** (lowercase with hyphens) matching the project title:

- `discoveria.jpg` - Discoveria project
- `craftable-armour-trims.jpg` - Craftable Armour Trims project
- `subnautica-in-minecraft.jpg` - Subnautica in Minecraft project
- `acecommander09-tech.jpg` - AceCommander09.tech project
- `call-of-duty-in-minecraft.jpg` - Call of Duty in Minecraft project
- `minecraft-cathedral-house.jpg` - Minecraft Cathedral House project

## How to Add/Update Images

1. Save your project image with the appropriate filename (using the naming convention above)
2. Replace the placeholder file in this directory
3. Supported formats: `.jpg`, `.png`, `.webp`
4. Recommended size: 400x200 pixels (2:1 aspect ratio) for best display

## Adding New Projects

When adding a new project to the website:

1. Convert the project title to kebab-case (e.g., "My New Project" → "my-new-project")
2. Add the image file as `my-new-project.jpg` to this directory
3. Update the project data in `app/page.tsx` with the image path `/projects/my-new-project.jpg`
