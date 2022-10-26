import { config } from "@grida/builder-config";
import { HistoryState } from "core/states/history-state";

export interface WorkspaceState {
  history: HistoryState;
  /**
   * hovered layer; single or none.
   */
  highlightedLayer?: string;
  preferences: WorkspacePreferences;

  /**
   * figma authentication data store state
   * @deprecated - not implemented
   */
  authenticationFigma?: {
    name?: string;
    accessToken?: string;
    personalAccessToken?: string;
  };
}

export interface WorkspacePreferences {
  debug_mode: boolean;
  framework_config: config.FrameworkConfig;
  preview_runner_framework_config: config.FrameworkConfig;
  enable_preview_feature_components_support: boolean;
}
