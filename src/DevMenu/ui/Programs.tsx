import React, { useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Button } from "../../ui/React/Button";
import { Select } from "../../ui/React/Select";
import { IPlayer } from "../../PersonObjects/IPlayer";
import { Programs as AllPrograms } from "../../Programs/Programs";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import ReplyIcon from "@material-ui/icons/Reply";
import InputLabel from "@material-ui/core/InputLabel";

const bigNumber = 1e12;

interface IProps {
  player: IPlayer;
}

export function Programs(props: IProps): React.ReactElement {
  const [program, setProgram] = useState("NUKE.exe");
  function setProgramDropdown(event: React.ChangeEvent<{ value: unknown }>): void {
    setProgram(event.target.value as string);
  }
  function addProgram(): void {
    if (!props.player.hasProgram(program)) {
      props.player.getHomeComputer().programs.push(program);
    }
  }

  function addAllPrograms(): void {
    for (const i in AllPrograms) {
      if (!props.player.hasProgram(AllPrograms[i].name)) {
        props.player.getHomeComputer().programs.push(AllPrograms[i].name);
      }
    }
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h2>Programs</h2>
      </AccordionSummary>
      <AccordionDetails>
        <table>
          <tbody>
            <tr>
              <td>
                <span className="text">Program:</span>
              </td>
              <td>
                <Select onChange={setProgramDropdown} value={program}>
                  {Object.values(AllPrograms).map((program) => (
                    <MenuItem key={program.name} value={program.name}>
                      {program.name}
                    </MenuItem>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td>
                <span className="text">Add:</span>
              </td>
              <td>
                <Button onClick={addProgram}>One</Button>
                <Button onClick={addAllPrograms}>All</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </AccordionDetails>
    </Accordion>
  );
}
