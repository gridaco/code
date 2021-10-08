import * as web from "@web-builder/core";
import * as core from "@reflect-ui/core";
import { keyFromWidget } from "@web-builder/core";

export function compose_wrap(
  wrap: core.Wrap,
  children: web.WidgetTree[]
): web.Flex {
  return new web.Flex({
    ...wrap,
    direction: wrap.direction,
    mainAxisAlignment: wrap_alignment_to_main_axis_alignment(wrap.alignment),
    crossAxisAlignment: wrap_cross_alignment_to_cross_axis_alignment(
      wrap.crossAxisAlignment
    ),
    itemSpacing: wrap.spacing,
    flexWrap: "wrap",
    children: children,
    key: keyFromWidget(wrap),
  });
}

const wrap_alignment_to_main_axis_alignment = (
  wrapalignment: core.WrapAlignment
): core.MainAxisAlignment => {
  switch (wrapalignment) {
    case core.WrapAlignment.start:
      return core.MainAxisAlignment.start;
    case core.WrapAlignment.end:
      return core.MainAxisAlignment.end;
    case core.WrapAlignment.center:
      return core.MainAxisAlignment.center;
  }
};

const wrap_cross_alignment_to_cross_axis_alignment = (
  wrapcrossalignment: core.WrapCrossAlignment
) => {
  switch (wrapcrossalignment) {
    case core.WrapCrossAlignment.start:
      return core.CrossAxisAlignment.start;
    case core.WrapCrossAlignment.end:
      return core.CrossAxisAlignment.end;
    case core.WrapCrossAlignment.center:
      return core.CrossAxisAlignment.center;
  }
};
