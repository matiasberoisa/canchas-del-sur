class Reserva {
  id;
  turnoId;
  usuarioId;
  constructor(id, turnoId, usuarioId) {
    this.id = id;
    this.turnoId = turnoId;
    this.usuarioId = usuarioId;
  }
}
module.exports = Reserva;