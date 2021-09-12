import React, { useEffect, useState } from "react";
import { ButtonGroup, Grid, Popper, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import ptLocale from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Fade from "@material-ui/core/Fade";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import localForage from "localforage";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    height: 50,
    borderRadius: "20px",
  },
}));

const CustomCheckBox = withStyles({
  root: {
    color: "#768fff",
    "&$checked": {
      color: "#0039cb",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Filters(props) {
  const classes = useStyles();
  const receivedFilters = props.filter;
  const [checked, setChecked] = React.useState(true);
  const [Send, setSend] = React.useState("");
  const [indicador, setIndicador] = React.useState("");
  const [empresa, setEmpresa] = React.useState([]);
  const [filial, setFilial] = React.useState([]);
  const [formato, setFormato] = React.useState("");
  const [cargo, setCargo] = React.useState([]);
  const [vinculo, setVinculo] = React.useState([]);
  const [diretoria, setDiretoria] = React.useState([]);
  const [despesa, setDespesa] = React.useState([]);
  const [dateInit, setDateInit] = React.useState("2019/01");
  const [dateDone, setDateDone] = React.useState("2021/02");
  const [grupo, setGrupo] = React.useState("");
  const [tipo, setTipo] = React.useState("");

  const getIndicador = async () => {
    await localForage.getItem("route").then((rout) => {
      setIndicador(rout.route);
    });
  };

  useEffect(() => {
    getIndicador();
    props.receivedData(Send);
  }, []);

  useEffect(() => {
    localForage.setItem("filters", {
      filters: Send,
    });
  }, [Send]);

  useEffect(() => {
    handleData();
  }, [
    tipo,
    empresa,
    grupo,
    indicador,
    filial,
    diretoria,
    despesa,
    dateDone,
    dateInit,
    cargo,
    formato,
    vinculo,
  ]);

  const clearData = () => {
    setTipo("");
    setEmpresa([]);
    setGrupo("");
    setFilial([]);
    setCargo([]);
    setFormato("");
    setVinculo([]);
    setDiretoria([]);
    setDespesa([]);
    setDateInit("2019/01");
    setDateDone("2021/02");
  };

  const handleData = async () => {
    setSend({
      tipo: tipo,
      inicio: dateInit,
      termino: dateDone,
      grupo: grupo,
      empresa:
        empresa == "Selecionar Tudo"
          ? receivedFilters[0].data.slice(1)
          : empresa,
      filial:
        filial == "Selecionar Tudo" ? receivedFilters[1].data.slice(1) : filial,
      formato: formato,
      cargo:
        cargo == "Selecionar Tudo" ? receivedFilters[4].data.slice(1) : cargo,
      despesa:
        despesa == "Selecionar Tudo"
          ? receivedFilters[3].data.slice(1)
          : despesa,
      diretoria:
        diretoria == "Selecionar Tudo"
          ? receivedFilters[2].data.slice(1)
          : diretoria,
      vinculo:
        vinculo == "Selecionar Tudo"
          ? receivedFilters[5].data.slice(1)
          : vinculo,
    });
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <>
      <Grid
        container
        direction="row"
        justify="start"
        style={{ borderRadius: "5px" }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Filtros{" "}
            {checked ? (
              <ExpandLessIcon
                onClick={() => {
                  setChecked(!checked);
                }}
                style={{ color: global.salt, cursor: "pointer" }}
              ></ExpandLessIcon>
            ) : (
              <ExpandMoreIcon
                onClick={() => {
                  setChecked(!checked);
                }}
                style={{ color: global.salt, cursor: "pointer" }}
              ></ExpandMoreIcon>
            )}
          </Typography>
          <Fade in={checked} timeout={500}>
            <Grid
              container
              justify="start"
              style={{ display: checked ? "flex" : "none" }}
            >
              {receivedFilters[0] ? (
                <>
                  {indicador == "Diversidade" ? (
                    <Autocomplete
                      disableCloseOnSelect
                      className={classes.formControl}
                      id={receivedFilters[9].title}
                      value={grupo}
                      labelId={receivedFilters[9].title}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <CustomCheckBox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </React.Fragment>
                      )}
                      options={receivedFilters[9].data}
                      onChange={async (event, newValue) => {
                        setGrupo(newValue);
                      }}
                      style={{ height: "50px" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={receivedFilters[9].title}
                          placeholder="+"
                        />
                      )}
                    />
                  ) : null}
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    className={classes.formControl}
                    id={receivedFilters[0].title}
                    value={empresa}
                    labelId={receivedFilters[0].title}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <CustomCheckBox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    options={receivedFilters[0].data}
                    onChange={async (event, newValue) => {
                      setEmpresa(newValue);
                    }}
                    style={{ height: "50px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={receivedFilters[0].title}
                        placeholder="+"
                      />
                    )}
                  />
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    className={classes.formControl}
                    value={filial}
                    labelId={receivedFilters[1].title}
                    id={receivedFilters[1].title}
                    options={receivedFilters[1].data}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <CustomCheckBox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    onChange={async (event, newValue) => {
                      setFilial(newValue);
                    }}
                    style={{ height: "50px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={receivedFilters[1].title}
                        placeholder="+"
                      />
                    )}
                  />

                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    className={classes.formControl}
                    value={diretoria}
                    labelId={receivedFilters[2].title}
                    id={receivedFilters[2].title}
                    options={receivedFilters[2].data}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <CustomCheckBox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    onChange={async (event, newValue) => {
                      setDiretoria(newValue);
                    }}
                    style={{ height: "50px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={receivedFilters[2].title}
                        placeholder="+"
                      />
                    )}
                  />
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    className={classes.formControl}
                    value={despesa}
                    labelId={receivedFilters[3].title}
                    id={receivedFilters[3].title}
                    options={receivedFilters[3].data}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <CustomCheckBox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    onChange={async (event, newValue) => {
                      setDespesa(newValue);
                    }}
                    style={{ height: "50px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={receivedFilters[3].title}
                        placeholder="+"
                      />
                    )}
                  />
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    className={classes.formControl}
                    value={cargo}
                    labelId={receivedFilters[4].title}
                    id={receivedFilters[4].title}
                    options={receivedFilters[4].data}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <CustomCheckBox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    onChange={async (event, newValue) => {
                      setCargo(newValue);
                    }}
                    style={{ height: "50px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={receivedFilters[4].title}
                        placeholder="+"
                      />
                    )}
                  />
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    className={classes.formControl}
                    value={vinculo}
                    labelId={receivedFilters[5].title}
                    id={receivedFilters[5].title}
                    options={receivedFilters[5].data}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <CustomCheckBox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    onChange={async (event, newValue) => {
                      setVinculo(newValue);
                    }}
                    style={{ height: "50px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={receivedFilters[5].title}
                        placeholder="+"
                      />
                    )}
                  />
                  <Autocomplete
                    className={classes.formControl}
                    value={formato}
                    labelId={receivedFilters[6].title}
                    id={receivedFilters[6].title}
                    options={receivedFilters[6].data}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <CustomCheckBox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    onChange={async (event, newValue) => {
                      setFormato(newValue);
                    }}
                    style={{ height: "50px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={receivedFilters[6].title}
                        placeholder="+"
                      />
                    )}
                  />
                  {indicador == "Turnover" ? (
                    <Autocomplete
                      disableCloseOnSelect
                      className={classes.formControl}
                      id={receivedFilters[9].title}
                      value={tipo}
                      labelId={receivedFilters[9].title}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <CustomCheckBox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </React.Fragment>
                      )}
                      options={receivedFilters[9].data}
                      onChange={async (event, newValue) => {
                        setTipo(newValue);
                      }}
                      style={{ height: "50px" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={receivedFilters[9].title}
                          placeholder="+"
                        />
                      )}
                    />
                  ) : null}
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={ptLocale}
                  >
                    <DatePicker
                      cancelLabel="Cancelar"
                      className={classes.formControl}
                      views={["year", "month"]}
                      id={receivedFilters[7].title}
                      format="yyyy/MM"
                      helperText=""
                      minDate={new Date("2016/01")}
                      maxDate={new Date("2021/02")}
                      value={dateInit}
                      onChange={(event) => {
                        setDateInit(Moment(event).format("yyyy/MM"));
                      }}
                      InputProps={{
                        disableUnderline: true,
                        style: { cursor: "pointer" },
                      }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        height: "55px",
                        border: "1px solid #CECECE",
                        paddingTop: "12px",
                        borderRadius: "5px",
                        paddingLeft: "12px",
                        cursor: "pointer",
                      }}
                      DialogProps={{}}
                    />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={ptLocale}
                  >
                    <DatePicker
                      cancelLabel="Cancelar"
                      className={classes.formControl}
                      views={["year", "month"]}
                      id={receivedFilters[8].title}
                      format="yyyy/MM"
                      helperText=""
                      minDate={new Date("2016/01")}
                      maxDate={new Date("2021/02")}
                      value={dateDone}
                      onChange={(event) => {
                        setDateDone(Moment(event).format("yyyy/MM"));
                      }}
                      InputProps={{
                        disableUnderline: true,
                        style: { cursor: "pointer" },
                      }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        height: "55px",
                        border: "1px solid #CECECE",
                        paddingTop: "12px",
                        borderRadius: "5px",
                        paddingLeft: "12px",
                        cursor: "pointer",
                      }}
                      DialogProps={{}}
                    />
                  </MuiPickersUtilsProvider>
                  <Button
                    variant="contained"
                    onClick={() => {
                      props.receivedData(Send);
                    }}
                    disableElevation
                    style={{
                      backgroundColor: "#2962ff",
                      color: "white",
                      margin: "8px",
                      width: "150px",
                      height: "55px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h6"
                      gutterBottom
                      style={{ color: "white", margin: "auto" }}
                    >
                      Aplicar
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      clearData();
                      props.receivedData(Send);
                    }}
                    disableElevation
                    style={{
                      backgroundColor: global.primary,
                      color: "white",
                      margin: "8px",
                      width: "150px",
                      height: "55px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h6"
                      gutterBottom
                      style={{ color: "white", margin: "auto" }}
                    >
                      Limpar
                    </Typography>
                  </Button>
                </>
              ) : null}
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </>
  );
}
