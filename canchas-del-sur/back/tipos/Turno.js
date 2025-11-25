 class Turno {
  id;
  canchaId;
  fecha;
  horarioDesde;
  horarioHasta;
  reservaId;
  constructor(id, canchaId, fecha, horarioDesde, horarioHasta) {
    this.id = id;
    this.canchaId = canchaId;
    this.fecha = fecha;
    this.horarioDesde = horarioDesde;
    this.horarioHasta = horarioHasta;
    this.reservaId = null;
  }
}
module.exports = Turno;
