-- The original constraint blocked ANY second booking on a slot forever,
-- even after the first was cancelled. Application logic (slot.booked flag
-- + isBooked() check in BookingService) already prevents two ACTIVE
-- bookings on the same slot, so this constraint was redundant and wrong.
--
-- availability_slot_id also backs the fk_bookings_slot foreign key, and
-- MySQL refuses to drop an index a foreign key depends on unless a
-- replacement index exists first - so we add a plain (non-unique) index
-- before removing the unique one.
CREATE INDEX idx_bookings_slot_fk ON bookings(availability_slot_id);

ALTER TABLE bookings DROP INDEX uk_bookings_slot;