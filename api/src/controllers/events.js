import {
  listEvents,
  countEvents,
  findEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "#models/events.js";
import {
  EventIdParams,
  EventInput,
  EventListQuery,
  EventPatchInput,
} from "#schemas/events.js";

const MAX_PAGE_SIZE = 100;

/**
 * Event controller (MVC example)
 */

export async function getEvents(req, res, next) {
  try {
    // 1. Parse and normalize query params using the new Zod schema from main
    let { page, pageSize } = EventListQuery.parse(req.query);

    // 2. strict MAX_PAGE_SIZE validation
    if (pageSize > MAX_PAGE_SIZE) {
      pageSize = MAX_PAGE_SIZE;
    }

    const offset = (page - 1) * pageSize;

    // 3. Keep the search filter mapping we built
    const filters = {
      search: req.query.q || undefined,
    };

    const data = await listEvents(filters, {
      limit: pageSize,
      offset,
      orderBy: "id",
      order: "asc",
    });

    const totalItems = await countEvents(filters);
    const totalPages = Math.ceil(totalItems / pageSize);

    res.json({
      data,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getEventById(req, res, next) {
  try {
    // Use the new Zod schema to validate the ID safely
    const { id } = EventIdParams.parse(req.params);
    const event = await findEventById(id);

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.json({ data: event });
  } catch (error) {
    next(error);
  }
}

// ---------------------------------------------------------
// OPTIONAL PLACEHOLDERS
// Returning 501 directly without calling the DB
// ---------------------------------------------------------

export async function postEvent(req, res, next) {
  return res.status(501).json({
    error:
      "Optional placeholder: postEvent is intentionally not implemented in the base skeleton",
  });
}

export async function patchEvent(req, res, next) {
  return res.status(501).json({
    error:
      "Optional placeholder: patchEvent is intentionally not implemented in the base skeleton",
  });
}

export async function removeEvent(req, res, next) {
  return res.status(501).json({
    error:
      "Optional placeholder: removeEvent is intentionally not implemented in the base skeleton",
  });
}
