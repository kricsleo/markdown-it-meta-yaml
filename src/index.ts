import { load } from 'js-yaml'
import MarkdownIt from 'markdown-it'
import type StateBlock from 'markdown-it/lib/rules_block/state_block'

/** options */
export interface Options {
  /** callback after yaml content is parsed */
  cb?(yamlJSON: Record<string, any>, yamlRaw: string): void
}

const YAML_BLOCK_REG = /^---$/

/** Plugin for MarkdownIt */
export default function markdownItYamlPlugin(md: MarkdownIt, options: Options) {
  md.block.ruler.before('code', 'yaml', createYamlRuleBlock(options));
}

/** RuleBlock Parser for MarkdownIt */
function createYamlRuleBlock(options: Options = {}) {
  return function yamlRuleBlock(state: StateBlock, start: number, end: number, silent: boolean) {
    if (
      start !== 0 
      || state.blkIndent !== 0 
      || state.tShift[start] < 0
      || !YAML_BLOCK_REG.test(getStr(state, start))
    ) {
      return false
    }
    let yamlEnd = -1
    let next = start;
    while (next < end) {
      next++;
      if (YAML_BLOCK_REG.test(getStr(state, next))) {
        yamlEnd = next
        break;
      }
    }
    if (yamlEnd === -1) {
      return false;
    }
    const content = state.src.slice(state.bMarks[start + 1], state.bMarks[yamlEnd]);
    // No output currently
    // if (!silent) {
    //   const token = state.push('yaml', 'yaml', 0);
    //   token.markup = '---';
    //   token.content = content;
    //   token.map = [start, yamlEnd];
    //   token.block = true;
    // }
    const meta = load(content, {json: true}) as Record<string, unknown> || {}
    options.cb?.(meta, content)
    state.line = yamlEnd + 1
    return true
  }
}

function getStr(state: any, line: number) {
  const pos = state.bMarks[line]
  const max = state.eMarks[line]
  return state.src.slice(pos, max)
}
