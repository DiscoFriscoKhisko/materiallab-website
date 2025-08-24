#!/usr/bin/env node

/**
 * CLI Runner for Material Design Validation
 */

import { program } from 'commander';
import ClaudeWorkflow from './claude-workflow.js';

// CLI setup
program
  .name('run-validation')
  .description('Run Material Design validation for MaterialLab')
  .version('1.0.0');

program
  .command('quick')
  .description('Quick validation check')
  .option('-u, --url <url>', 'URL to validate', '/')
  .option('-c, --component <name>', 'Component to check')
  .option('-d, --debug', 'Debug mode')
  .action(async (options) => {
    const workflow = new ClaudeWorkflow();
    try {
      await workflow.handleUserRequest('Quick validation', {
        mode: 'quick',
        ...options
      });
    } catch (error) {
      console.error('Quick check failed:', error);
      process.exit(1);
    }
  });

program
  .command('full')
  .description('Full validation pipeline')
  .option('-f, --files <files...>', 'Specific files to check')
  .action(async (options) => {
    const workflow = new ClaudeWorkflow();
    try {
      await workflow.handleUserRequest('Full validation', {
        mode: 'full',
        files: options.files
      });
    } catch (error) {
      console.error('Full validation failed:', error);
      process.exit(1);
    }
  });

program
  .command('loop')
  .description('Run iterative correction loop')
  .argument('<request>', 'Implementation request')
  .option('-f, --files <files...>', 'Changed files')
  .action(async (request, options) => {
    const workflow = new ClaudeWorkflow();
    try {
      await workflow.handleUserRequest(request, {
        mode: 'loop',
        files: options.files
      });
    } catch (error) {
      console.error('Agentic loop failed:', error);
      process.exit(1);
    }
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse();
}